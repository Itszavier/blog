/** @format */

import { Router } from "express";
import ensureAuthenticated from "../middleware/checkauth";
import UserModel from "../model/user";
import PostModel, { IPost } from "../model/post";
import { z } from "zod";
import mongoose from "mongoose";
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

router.get("/create", ensureAuthenticated, async function (req, res, next) {
  try {
    const fields = getAuthorFields();

    const postSchema = z.object({
      type: z.string(),
      title: z
        .string()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" }),
      subtitle: z
        .string()
        .min(5, { message: "Subtitle must be at least 5 characters long" })
        .max(150, { message: "Subtitle cannot exceed 150 characters" }),
      description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description cannot exceed 500 characters" })
        .optional(),
      tags: z.array(z.string()).default([]),
      content: z.object({
        html: z.string().default(""),
        text: z.string().default(""),
      }),

      published: z.boolean().default(false),
    });

    const body = postSchema.safeParse(req.body);

    const post = await (
      await PostModel.create({ ...body, author: req.user?._id })
    ).populate("author", fields);

    res.status(200).json({
      message: "successfully created post",
      post,
    });
  } catch (error) {
    next(error);
  }
});

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

export default router;
