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
import user from "../model/user";
import uploadImageFile from "../utils";

const router = Router();

/*interface IFollowersAndFollowing {
  _id: string;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
}
*/
const userSelectedFields = [
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

router.get("/fetch/:id", async (req, res, next) => {
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
        username: user.username,
        followers: user.followers,
        following: user.following,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/fetch/username/:username", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username })
      .select(userSelectedFields.join(" "))
      .populate(["followers", "following"].join(" "), userSelectedFields.join(" "))
      .exec();

    if (!user) {
      return next(errorMessage(404, "Invalid user Id"));
    }

    res.status(200).json({
      message: ".",
      user: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find([])
      .select(getSelectedUserFields("user"))
      .populate("followers following", getSelectedUserFields("follow"))
      .exec();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const profileUpload = multer();

// update user profile

router.put(
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

      const { secure_url, public_id } = await uploadImageFile({
        file,
        folder: "profile",
        previous: user.profileImage,
      });

      user.profileImage = {
        id: public_id,
        storage: "cloud",
        url: secure_url,
      };

      const savedUser = await user.save();

      (await savedUser.populate("author", getSelectedUserFields("user"))).populate(
        "following followers",
        getSelectedUserFields("follow")
      );

      res.json({
        url: secure_url,
        user: savedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/update/profile",
  ensureAuthenticated,
  profileUpload.single("profileImage"),
  async (req, res, next) => {
    try {
      // Find the user
      const user = await UserModel.findById(req.user?._id);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const bodySchema = z.object({
        name: z.string().min(1, "Name is required"),
        username: z
          .string()
          .min(4, "Username must be at least 4 characters long")
          .max(20, "Username must not exceed 20 characters")
          .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username must only contain letters, numbers, and underscores"
          )
          .optional(),
        bio: z.string().max(150, "Bio can only be up to 150 characters long").optional(),
        socials: z.string().optional(),
      });

      // Validate the request body
      const body = bodySchema.parse(req.body);

      // Handle profile image upload if a file is provided
      if (req.file) {
        const { public_id, secure_url } = await uploadImageFile({
          file: req.file,
          folder: "profile",
          previous: user.profileImage,
        });
        user.profileImage = { id: public_id, storage: "cloud", url: secure_url };
      }

      // Check for username uniqueness if it's being updated
      if (body.username && body.username !== user.username) {
        const existingUser = await UserModel.findOne({ username: body.username });
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
          return res.status(400).json({
            message:
              "The username you entered is already in use. Please choose a different one.",
          });
        }
        user.username = body.username;
      }
      if (body.socials) {
        user.socials = JSON.parse(body.socials);
      }
      // Update user profile details
      user.name = body.name;
      if (body.bio) user.bio = body.bio;

      const updatedUser = await user.save();

      res.status(200).json({
        message: "Profile updated successfully",
        updated: {
          name: updatedUser.name,
          username: updatedUser.username,
          bio: updatedUser.bio,
          profileImage: updatedUser.profileImage,
          email: updatedUser.email,
          socials: updatedUser.socials,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }
);

router.put("/follow", ensureAuthenticated, async (req, res, next) => {
  const bodySchema = z.object({
    userId: z
      .string({
        invalid_type_error: "There is a typo in system code, userId must be a [string]",
      })
      .min(1, "userId must be present"),
  });

  try {
    const body = bodySchema.parse(req.body);

    const userId = req.user!._id;
    const userToFollowId = body.userId;

    const userToFollow = await UserModel.findOne({ _id: userToFollowId });

    if (!userToFollow) {
      return next(errorMessage(400, "The user your trying to follow does not exist"));
    }

    if (userToFollow._id === req.user?._id) {
      return next(errorMessage(400, "Can't follow yourself")); // can also ignore
    }
    // handles if the user is already following the user
    if (userToFollow.followers.includes(req.user?._id as any)) {
      return next(errorMessage(400, "Already following this user")); // can also ignore by returning null
    }
    // Update current user following array
    const followingUpdateResults = await UserModel.findByIdAndUpdate(userId, {
      $push: { following: userToFollowId },
    })
      .select(getSelectedUserFields("user"))
      .populate("followers following", getSelectedUserFields("follow"))
      .exec();

    // Update the followers for the user that the current user is following
    const followersUpdateResults = await UserModel.findByIdAndUpdate(userToFollowId, {
      $push: { followers: userId },
    })
      .select(getSelectedUserFields("user"))
      .populate("followers following", getSelectedUserFields("follow"))
      .exec();

    return res.status(200).json({
      message: "Successfully followed the user",
      followersUpdateResults,
      followingUpdateResults,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/// Route for unfollowing a user
router.put("/unfollow", ensureAuthenticated, async (req, res, next) => {
  // Define and validate request body schema
  const bodySchema = z.object({
    userId: z
      .string({
        invalid_type_error: "There is a typo in system code, userId must be a [string]",
      })
      .min(1, "userId must be present"),
  });

  try {
    const body = bodySchema.parse(req.body);

    // Find the user to unfollow in the database

    const userId = req.user!._id;
    const userToUnFollowId = body.userId;
    const userToUnfollow = await UserModel.findOne({ _id: userToUnFollowId });

    // Check if the user to unfollow exists
    if (!userToUnfollow) {
      return next(
        errorMessage(400, "The user you are trying to unfollow does not exist")
      );
    }

    // Prevent users from unfollowing themselves
    if (userToUnfollow._id === userId) {
      return next(errorMessage(400, "Can't unfollow yourself"));
    }
    const currentUser = req.user!;

    const isCurrentUserFollowing = currentUser.following.some(
      (following) => following.toString() === userToUnFollowId
    );

    // Check if not following the user
    if (!isCurrentUserFollowing) {
      return next(errorMessage(400, "Not following this user"));
    }

    // remove followers id from the user the current user wants to unfollow
    const followersUpdate = await UserModel.findByIdAndUpdate(userToUnFollowId, {
      $pull: { followers: userId },
    })
      .select(getSelectedUserFields("user"))
      .populate("followers following", getSelectedUserFields("follow"))
      .exec();

    // remove following id from the current user
    const followingUpdate = await UserModel.findByIdAndUpdate(userId, {
      $pull: { following: userToUnFollowId },
    })
      .select(getSelectedUserFields("user"))
      .populate("followers following", getSelectedUserFields("follow"))
      .exec();

    res.status(200).json({
      message: "successfully unfollow the user",
      followingUpdate,
      followersUpdate,
    });
  } catch (error) {
    // Handle and log any errors
    console.error(error);
    next(error);
  }
});

router.get("/username/isAvailable/:username", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });

    if (user) {
      res.status(200).json({
        available: false,
        message: "Username is Unavailiable",
      });
    } else {
      res.status(200).json({
        available: true,
        message: "Username is Unavailiable",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
function uploadFile(file: Express.Multer.File) {
  throw new Error("Function not implemented.");
}
