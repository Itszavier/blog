/** @format */

import { Router } from "express";
import ensureAuthenticated from "../middleware/checkauth";
import UserModel from "../model/user";
import PostModel, { IPost } from "../model/post";
import { z } from "zod";
import unqineId from "generate-unique-id";
import mongoose from "mongoose";
import generateUniqueId from "generate-unique-id";
import { heroImageUpload } from "../multer/file";
import { errorMessage } from "../middleware/error";
import uploadFile from "../utils";
const router = Router();

export const getAuthorFields = (custom?: string) => {
  return custom || "name username bio profileImage";
};

router.get("/", async function (req, res, next) {
  try {
    const posts = await PostModel.find().populate("author", getAuthorFields()).exec();
    res.status(200).json({ message: "Here are all the posts", posts });
  } catch (error) {
    next(error);
  }
});

router.get("/fetch/unpublished/:id", ensureAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOne({ _id: postId, published: false });

    if (!post) return next(errorMessage(404, "There isn't any unpublished post with id"));

    const userId: any = req.user?._id;

    if (!post.author.equals(userId)) {
      return next(
        errorMessage(401, "You can only access unpublished post if it's yours")
      );
    }
    
    await post.populate("author", getAuthorFields());

    res.status(200).json({
      message: `${req.user?.name} here is your unpublished post`,
      post: post,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  ensureAuthenticated,
  heroImageUpload.single("heroImage"),
  async function (req, res, next) {
    try {
      const fields = getAuthorFields();

      console.log(req.body);
      const defaultTitle = `draft-${generateUniqueId({
        length: 9,
        useNumbers: false,
        useLetters: true,
      })}`;

      const postSchema = z.object({
        title: z
          .string()
          .min(5, { message: "Title must be at least 5 characters long" })
          .max(100, { message: "Title cannot exceed 100 characters" })
          .default(defaultTitle),
        subtitle: z
          .string()
          .min(0, { message: "Subtitle must be at least 5 characters long" })
          .max(150, { message: "Subtitle cannot exceed 150 characters" }),
        description: z
          .string()
          .min(10, { message: "Description must be at least 10 characters long" })
          .max(500, { message: "Description cannot exceed 500 characters" })
          .optional(),

        published: z.boolean().default(false),
      });

      const body = postSchema.parse(req.body);
      console.log(body);
      const post = new PostModel({ ...body, author: req.user?._id, type: "Article" });

      if (req.file) {
        const { public_id, url } = await uploadFile(req.file, "heroImageFolder");
        post.heroImage = {
          id: public_id,
          storage: "cloud",
          url,
        };
      }

      const savedPost = await (await post.save()).populate("author", fields);
      res.status(200).json({
        message: "successfully created post",
        post: savedPost,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post("/update/content", ensureAuthenticated, async function (req, res, next) {
  try {
    const updateContentSchema = z.object({
      postId: z.string(),
      content: z.object({
        html: z.string(),
        text: z.string(),
      }),
    });

    // Validate request body with Zod schema
    const { postId, content } = updateContentSchema.parse(req.body);

    // Find the post by ID
    const post = await PostModel.findById(postId);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the current user is the author of the post
    const userId: any = req.user?._id;

    if (!post.author.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    // Update the content of the post
    post.content = content;

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json({
      message: "Post content updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/update/hero-image/:id",
  ensureAuthenticated,
  heroImageUpload.single("image"),
  async function (req, res, next) {
    const post = await PostModel.findOne({
      _id: req.params.id,
    });

    if (!post) {
      return next(errorMessage(404, "there is no posts with that id"));
    }
    const userId: any = req.user?._id;

    if (!post.author.equals(userId))
      return next(errorMessage(404, "Unauthorized post access this is not your post"));

    if (!req.file) {
      return next(errorMessage(400, "Failed to hero image"));
    }

    const { public_id, secure_url } = await uploadFile(req.file, "heroImageFolder");

    post.heroImage = {
      storage: "cloud",
      url: secure_url,
      id: public_id,
    };

    const saved = (await post.save()).populate("author", getAuthorFields());
    res.status(200).json({ message: "updated post hero image", updated: saved });
  }
);

export default router;
