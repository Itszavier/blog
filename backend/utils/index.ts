/** @format */

import { UploadApiResponse } from "cloudinary";
import cloudinary from "../cloudinaryConfig";
import generateUniqueId from "generate-unique-id";

export default async function uploadFile(
  file: Express.Multer.File,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const public_id = generateUniqueId({
      length: 9,
      includeSymbols: ["-"],
      useNumbers: false,
    });

    cloudinary.uploader
      .upload_stream(
        {
          public_id: public_id,
          resource_type: "image",
        },
        function (error, results) {
          if (error) {
            return reject(error);
          }
          console.log("done uploading", results);
          resolve(results as UploadApiResponse);
        }
      )
      .end(file.buffer);
  });
}
