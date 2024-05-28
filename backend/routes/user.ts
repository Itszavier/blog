/** @format */

import { Router } from "express";
import UserModel from "../model/user";
import verify from "../middleware/checkauth";
import { errorMessage } from "../middleware/error";
import { z } from "zod";
import cloudinary from "../cloudinaryConfig";
import multer, { memoryStorage } from "multer";
import generateUniqueId from "generate-unique-id";

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
  "/profile",
  verify,
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

router.post(
  "/update/profile",
  profileUpload.single("profile"),
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
        bio: z.string().max(250, "Bio can only be up to 250 characters long ").nullish(),
      });

      const valid = bodySchema.safeParse(req.body);

      if (!valid.success) {
        console.log(valid.error);
        return next(valid.error);
      }

      if (req.file) {
        const file = req.file;

        cloudinary.uploader
          .upload_stream(
            {
              public_id: `${generateUniqueId({ length: 9 })}-${file.originalname}-`,
              resource_type: "auto",
              folder: "profiles",
            },

            async function (err, result) {
              if (err) {
                return next(err);
              }

              user.profileImage = result?.url as string;
            }
          )
          .end(file.buffer);
      }

      if (req.body.name) {
        user.name = req.body.name;
      }
      // TODO: Make sure username does not cotain duplcate in the database
      if (req.body.username) {
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
