/** @format */

import { Router } from "express";
import UserModel from "../model/user";
import verify from "../middleware/checkauth";
import { errorMessage } from "../middleware/error";
import { z } from "zod";
import cloudinary from "../cloudinaryConfig";
import multer, { memoryStorage } from "multer";
import generateUniqueId from "generate-unique-id";
import { UploadApiResponse, UploadResponseCallback } from "cloudinary";
import ensureAuthenticated from "../middleware/checkauth";

const router = Router();

router.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });

    if (!user) {
      return next(errorMessage(404, "Invalid user Id"));
    }

    res.status(200).json({
      message: ".",
      user: {
        _id: user._id,
        name: user.name,
        profileImage: user.profileImage,
        bio: user.bio,
        bannerUrl: user.bannerUrl,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res, next) => res.json("hello world"));

const profileUpload = multer();

// update user profile

router.post(
  "/profileImage",
  ensureAuthenticated,
  profileUpload.single("avatar"),
  async (req, res, next) => {
    try {
      const file = req.file;
      const user = await UserModel.findOne({ id: req.user?._id as string });

      if (!user) return next(errorMessage(401, "UnAuthorized"));

      if (!file) {
        return next(errorMessage(400, "No file uploaded"));
      }

      cloudinary.uploader
        .upload_stream(
          {
            public_id: `${generateUniqueId({ length: 9 })}-${file.originalname}-`,
            resource_type: "auto",
            folder: "profiles",
          },
          async function (err, result) {
            if (err) {
              console.log(err);
              return next(errorMessage(400, "failed to upload file"));
            }
            try {
              user.profileImage = result?.url as string;
              await user.save();

              res.status(200).json({ message: "file uploaded successfully", result });
            } catch (error) {
              next(error);
            }
          }
        )
        .end(file.buffer as Buffer);
    } catch (error) {
      next(error);
    }
  }
);
function uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `${generateUniqueId({ length: 9 })}`,
          resource_type: "auto",
          folder: "profiles",
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

router.post(
  "/update/profile",
  ensureAuthenticated,
  profileUpload.single("profileImage"),
  async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ _id: req.user?._id as string });

      if (!user) {
        return next(errorMessage(401, "UnAuthorized"));
      }

      const bodySchema = z.object({
        name: z.string().min(1, "name cannot be an empty string").nullish(),
        username: z
          .string()
          .min(4, "Username must be atleast 4 charactors are more")
          .nullish(),
        bio: z.string().max(150, "Bio can only be up to 250 characters long ").nullish(),
      });

      const valid = bodySchema.safeParse(req.body);

      if (!valid.success) {
        return next(valid.error);
      }

      console.log(req.file);
      if (req.file) {
        const file = req.file;
        const results = await uploadFile(file);
        user.profileImage = results.url;
      }

      if (req.body.name) {
        user.name = req.body.name;
      }
      // TODO: Make sure username does not cotain duplcate in the database
      if (req.body.username) {
        const existingUser = await UserModel.findOne({ username: req.body.username });
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
          return next(
            errorMessage(
              400,
              "The username you entered is already in use. Please choose a different one"
            )
          );
        }
        user.username = req.body.username;
      }

      if (req.body.bio) {
        user.bio = req.body.bio;
      }
      const updated = await user.save();

      res.status(200).json({
        message: "successfully updated profile",
        updated: {
          name: updated.name,
          username: updated.username,
          bio: updated.bio,
          profileImage: updated.profileImage,
          email: updated.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
