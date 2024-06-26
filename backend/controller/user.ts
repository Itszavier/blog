/** @format */
import { NextFunction, Request, Response } from "express";
import UserModel from "../model/user";
import { getSelectedUserFields, userSelectedFields } from "../utils/";
import { errorMessage } from "../middleware/error";
import { z } from "zod";
import { isArray, min } from "lodash";
import { getAuthorFields } from "../routes/article";

export async function followUser(req: Request, res: Response, next: NextFunction) {
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
}

export async function unFollowUser(req: Request, res: Response, next: NextFunction) {
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
}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
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
}

export async function getUserByUsername(req: Request, res: Response, next: NextFunction) {
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
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
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
}
export async function getIsAvailable(req: Request, res: Response, next: NextFunction) {
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
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const bodySchema = z.object({
      name: z
        .string()
        .min(1, { message: "Name must be at least 1 character long" })
        .optional(),
      username: z
        .string()
        .min(5, { message: "Username must be at least 5 characters long" })
        .optional(),
      occupation: z
        .string()
        .min(1, { message: "Occupation must be at least 1 character long" })
        .optional(),
      bio: z
        .string()
        .min(5, { message: "Bio must be at least 5 characters long" })
        .max(150, { message: "Bio must be at most 150 characters long" }),
      socials: z
        .string()
        .transform((social, ctx) => {
          if (social === undefined) return [];

          try {
            const parsed = JSON.parse(social);
            if (
              Array.isArray(parsed) &&
              parsed.every((value) => typeof value === "string")
            ) {
              return parsed;
            } else {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Socials must be an array of strings",
              });
              return z.NEVER;
            }
          } catch (e) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Socials must be a valid JSON string",
            });
            return z.NEVER;
          }
        })
        .optional(),
    });

    const body = bodySchema.parse(req.body);

    const userId = req.user?._id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return next(errorMessage(401, "UnAuthorized"));
    }

    if (body.name) {
      user.name = body.name;
    }

    if (body.bio) {
      user.bio = body.bio;
    }

    if (body.occupation) {
      user.occupation = body.occupation;
    }

    if (body.username) {
      const existingUser = await UserModel.findOne({ username: body.username });
      if (existingUser) {
        return next(errorMessage(400, "username taken"));
      }
    }

    if (body.socials) {
      user.socials = [...new Set([...user.socials, ...body.socials])];
    }

    const updatedProfile = await user.save();
    await updatedProfile.populate("author", getAuthorFields());

    res.status(200).json({
      success: "Successfully updated profile",
      user: updatedProfile,
    });
  } catch (error) {
    console.log(error);
  }
}
