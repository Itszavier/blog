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

const getSelectedUserFields = (type: SelectedUserFields) => {
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
    next(error);
  }
});

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
