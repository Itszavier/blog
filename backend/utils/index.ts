/** @format */

import { UploadApiResponse } from "cloudinary";
import cloudinary from "../cloudinaryConfig";
import generateUniqueId from "generate-unique-id";
import bcrypt from "bcrypt";
import TokenModel, { tokenTypes } from "../model/token";
import mongoose from "mongoose";
export const unsupportedSymbols = [
  " ",
  "<",
  ">",
  "#",
  "%",
  '"',
  "{",
  "}",
  "|",
  "\\",
  "^",
  "[",
  "]",
  "`",
  ";",
  "/",
  "?",
  ":",
  "@",
  "=",
  "&",
  "$",
  "+",
  ",",
  "'",
];

interface IImageUpload {
  file: Express.Multer.File;
  previous: { id: string; storage: string; url: string };
  folder?: string;
}

export default async function uploadImageFile(
  config: IImageUpload
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    try {
      const { file, previous, folder } = config;

      // Delete previous image from Cloudinary if exists
      if (previous.id && previous.storage === "cloud") {
        cloudinary.uploader
          .destroy(previous.id)
          .then((deletedResource) => {
            console.log("Deleted previous image:", deletedResource);
          })
          .catch((deleteError) => {
            console.error("Failed to delete previous image:", deleteError);
          });
      }

      // Generate unique public_id for the new image
      const public_id = generateUniqueId({
        length: 9,
        includeSymbols: ["_"],
        useNumbers: false,
      });

      // Upload new image to Cloudinary
      const upload_stream = cloudinary.uploader.upload_stream(
        {
          public_id: public_id,
          resource_type: "auto", // Assume auto-detect the resource type
          folder: folder,
        },
        (error, results) => {
          if (error) {
            console.error("Error uploading image:", error);
            reject(error);
          } else {
            console.log("Uploaded image:", results);
            resolve(results as UploadApiResponse);
          }
        }
      );

      // Stream the file buffer to Cloudinary uploader
      upload_stream.end(file.buffer);
    } catch (error) {
      console.error("Upload process failed:", error);
      reject(error);
    }
  });
}

export const userSelectedFields = [
  "_id",
  "username",
  "name",
  "bio",
  "profileImage",
  "followers",
  "following",
];

type SelectedUserFields = "follow" | "user";

export const getSelectedUserFields = (type: SelectedUserFields) => {
  if (type === "follow") {
    return userSelectedFields
      .filter((field) => field !== "followers" && field !== "following")
      .join(" ");
  } else {
    return userSelectedFields.join(" ");
  }
};

export function verifyPassword(verifyPass: string, encryptedPass: string) {
  return new Promise<boolean>(function (resolve, reject) {
    bcrypt.compare(verifyPass, encryptedPass, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
}

export async function createTokon(userId: string, type: (typeof tokenTypes)[number]) {
  const randomtoken = generateUniqueId({
    length: 20,
    useLetters: true,
    useNumbers: true,
  });

  const token = new TokenModel({
    userId: userId,
    token: randomtoken, // Generate your token here
    type,
    expires: new Date(Date.now() + 3600000), // Token expires in 1 hour
  });

  await token.save();
  console.log("Token created successfully!");
}
