/** @format */

import { json, Router } from "express";
import ensureAuthenticated from "../middleware/checkauth";
import UserModel from "../model/user";
import PostModel, { IPost } from "../model/post";
import { string, z } from "zod";
import unqineId from "generate-unique-id";
import mongoose from "mongoose";
import generateUniqueId from "generate-unique-id";
import { heroImageUpload } from "../multer/file";
import { errorMessage } from "../middleware/error";
import uploadImageFile from "../utils";

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

router.get("/fetch/one/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOne({ _id: postId });

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

router.get("/fetch/unpublished/:id", ensureAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOne({ _id: postId, published: false });

    if (!post) return next(errorMessage(404, "There isn't any post with id"));

    await post.populate("author", getAuthorFields());

    res.status(200).json({
      message: `${req.user?.name} here is your unpublished post`,
      post: post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/fetch/publicView/:encodedTitle/:handle", async (req, res, next) => {
  try {
    const { encodedTitle, handle } = req.params;
    const decodedTitle = decodeURIComponent(encodedTitle.replace(/-/g, " "));
    const post = await PostModel.findOne({
      handle,
      title: { $regex: new RegExp(`^${decodedTitle}$`, "i") },
    });

    if (!post) return next(errorMessage(404, "There isn't any post with id"));

    await post.populate("author", getAuthorFields());

    res.status(200).json({
      message: `${req.user?.name} here is ${post.title}`,
      post: post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// user does not need to be logged in to view this these

router.get("/fetch/published/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const posts = await PostModel.find({ author: id, published: true })
      .populate("author", getAuthorFields())
      .exec();

    res.status(200).json({
      message: "",
      posts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/fetch/user/:id", ensureAuthenticated, async (req, res, next) => {
  try {
    const posts = await PostModel.find({ author: req.params.id })
      .populate("author", getAuthorFields())
      .exec();

    res.status(200).json({ message: "", posts });
  } catch (error) {
    next(error);
  }
});

router.get("/fetch/editable/:id", ensureAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findOne({ _id: id });

    if (!post) return next(errorMessage(404, "Failed to find a post with that id"));

    const userId: any = req.user?._id;

    if (!post.author.equals(userId)) {
      return next(
        errorMessage(401, "Unauthorized, you don't have permission to edit this post")
      );
    }
    await post.populate("author", getAuthorFields());

    res.status(200).json({
      message: "",
      post,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/publish/:id",
  ensureAuthenticated,
  heroImageUpload.single("heroImage"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const parsedBody = { ...req.body, tags: JSON.parse(req.body.tags!) };

      const post = await PostModel.findOne({ _id: id });

      if (!post) return next(errorMessage(404, "Could not find a post with that id"));
      const userId: any = req.user?._id;

      if (!post.author.equals(userId)) {
        return next(
          errorMessage(
            401,
            "You don't have permisions o publish this post, your not the author"
          )
        );
      }

      const postSchema = z.object({
        title: z
          .string()
          .min(5, { message: "Title must be at least 5 characters long" })
          .max(100, { message: "Title cannot exceed 100 characters" }),
        subtitle: z
          .string()
          .min(2, { message: "Subtitle must be at least 5 characters long" })
          .max(150, { message: "Subtitle cannot exceed 150 characters" }),
        tags: z.array(z.string()).default([]),
      });
      console.log(req.body);
      const body = postSchema.parse(parsedBody);

      if (req.file) {
        // Handle hero image upload if a file was uploaded
        const { public_id, secure_url } = await uploadImageFile({
          file: req.file,
          previous: post.heroImage,
          folder: "heroImages",
        });

        post.heroImage = {
          id: public_id,
          storage: "cloud",
          url: secure_url,
        };
      }
      post.title = body.title;
      post.subtitle = body.subtitle;
      post.tags = body.tags;

      if (!post.published) {
        post.published = true;
      }
      const savedPost = await post.save();

      await savedPost.populate("author", getAuthorFields());

      res.status(200).json({ message: "successfuly published post", post: savedPost });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/save/:id", heroImageUpload.single("heroImage"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const allowedFields: Array<keyof IPost> = ["title", "subtitle", "tags", "content"];

    const changes = req.body; // Changes received from the frontend
    console.log(changes);
    const post = await PostModel.findOne({ _id: id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.author.equals(req.user?._id as any)) {
      return next(errorMessage(401, "Unauthorized"));
    }

    // Update specific fields only if they exist in changes
    if ("title" in changes && changes.title.length > 0) {
      post.title = changes.title;
    }
    if ("subtitle" in changes && changes.title.length > 0) {
      post.subtitle = changes.subtitle;
    }
    if ("tags" in changes && changes.tags.length > 0) {
      post.tags = JSON.parse(changes.tags as string);
    }
    if ("content" in changes) {
      post.content = JSON.parse(changes.content);
      console.log("after added", post.content);
    }

    if (req.file) {
      // Handle hero image upload if a file was uploaded
      const { public_id, secure_url } = await uploadImageFile({
        file: req.file,
        previous: post.heroImage,
        folder: "heroImages",
      });
      post.heroImage = {
        id: public_id,
        storage: "cloud",
        url: secure_url,
      };
    }

    const savedPost = await post.save();

    console.log(savedPost.content);
    await savedPost.populate("author", getAuthorFields());

    res.status(200).json({ message: "Successfully saved post", post: savedPost });
  } catch (error) {
    console.error("Error saving post:", error);
    next(error);
  }
});

router.post("/create", ensureAuthenticated, async function (req, res, next) {
  try {
    const fields = getAuthorFields();

    const postSchema = z.object({
      title: z
        .string()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(120, { message: "Title cannot exceed 100 characters" }),
    });

    const body = postSchema.parse(req.body);

    const post = await PostModel.create({ title: body.title, author: req.user!._id });

    await post.populate("author", getAuthorFields());

    res.status(200).json({
      message: "successfully created post",
      post: post,
    });
  } catch (error) {
    console.log(error);
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

    const { public_id, secure_url } = await uploadImageFile({
      file: req.file,
      previous: post.heroImage,
      folder: "heroImages",
    });

    post.heroImage = {
      id: public_id,
      storage: "cloud",
      url: secure_url,
    };

    const saved = (await post.save()).populate("author", getAuthorFields());
    res.status(200).json({ message: "updated post hero image", updated: saved });
  }
);

export default router;
