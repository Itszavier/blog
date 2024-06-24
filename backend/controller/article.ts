/** @format */

import { NextFunction, Request, Response } from "express";
import z from "zod";
import UserModel from "../model/user";
import { errorMessage } from "../middleware/error";
import PostModel from "../model/post";
import uploadImageFile from "../utils";
import { getAuthorFields } from "../routes/article";

export async function createArticle(req: Request, res: Response, next: NextFunction) {
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
}

export async function publishArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const article = await PostModel.findById(req.params.id);

    const bodySchema = z.object({
      title: z
        .string()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(150, { message: "Title must be at most 150 characters long" }),
      subtitle: z
        .string()
        .min(5, { message: "Subtitle must be at least 5 characters long" })
        .max(150, { message: "Subtitle must be at most 150 characters long" }),
      description: z
        .string()
        .max(500, { message: "Description must be at most 500 characters long" })
        .optional(),
      tags: z
        .string()
        .optional()
        .transform((val) => {
          if (val === undefined) return [];
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed) && parsed.every((tag) => typeof tag === "string")) {
              return parsed;
            } else {
              throw new Error("Failed to parse tags");
            }
          } catch {
            throw new Error("Tags must be a valid JSON string of an array of strings");
          }
        })
        .refine((tags) => tags.length <= 10, {
          message: "You can only have up to 10 tags",
        }),
    });

    if (!article) {
      return next(errorMessage(400, "could not find an ariticle with Id"));
    }

    if (!article.author.equals(req.user!._id as string)) {
      console.log("(@publish): This is not your post ");
      return next(
        errorMessage(
          401,
          "unauthorized you are not allowed to publish posts this post it is not yours"
        )
      );
    }
    const body = bodySchema.parse(req.body);

    if (body.description) {
      article.description = body.description;
    }

    if (body.tags.length > 0) {
      article.tags = body.tags;
    }

    article.title = body.title;
    article.subtitle = body.subtitle;

    if (!article.published) {
      article.published = true;
    }

    if (req.file) {
      const { public_id, secure_url } = await uploadImageFile({
        file: req.file,
        previous: article.heroImage,
        folder: "cover",
      });

      article.heroImage = {
        id: public_id,
        storage: "cloud",
        url: secure_url,
      };
    }
    const savedArticle = await article.save();

    await article.populate("author", getAuthorFields());

    res.status(200).json({
      message: `Article ${article._id} have been published`,
      post: savedArticle,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function likeArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const { postId } = req.params;

    const post = await PostModel.findOne({ _id: postId });

    if (!post) {
      console.log("post was not found");
      return next(errorMessage(404, "Could not find a post with this Id"));
    }

    if (post.likes.includes(req.user?._id as any)) {
      console.log("User already like this post");
      return next(errorMessage(400, "You already like This post"));
    }

    if (post.likes.includes(req.user?._id as any)) {
      // remove dislike
      return next(errorMessage(400, "You already like this post"));
    }

    const updatedPost = await PostModel.findByIdAndUpdate(postId, {
      $push: { likes: req.user?._id },
    });

    await updatedPost!.populate("author", getAuthorFields());

    res.status(200).json({
      message: "successfuly liked this post",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function unLikeArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const { postId } = req.params;

    const post = await PostModel.findOne({ _id: postId });

    if (!post) {
      console.log("post was not found");
      return next(errorMessage(404, "Could not find a post with this Id"));
    }

    if (!post.likes.includes(req.user?._id as any)) {
      console.log("User already like this post");
      return next(errorMessage(404, "You didn't like This post"));
    }

    const updatedPost = await PostModel.findByIdAndUpdate(postId, {
      $pull: { likes: req.user?._id },
    });
    await updatedPost!.populate("author", getAuthorFields());

    res.status(200).json({
      message: "successfuly updated post",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getUserArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await PostModel.find({ author: req.params.id })
      .populate("author", getAuthorFields())
      .exec();

    res.status(200).json({ message: "", posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getEditable(req: Request, res: Response, next: NextFunction) {
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
}

export async function getArticleByEncodedTitle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { encodedTitle, handle } = req.params;
    const decodedTitle = decodeURIComponent(encodedTitle.replace(/-/g, " "));

    const post = await PostModel.findOne({
      handle,
      title: { $regex: new RegExp(`^${decodedTitle}$`, "i") },
    });

    if (!post) return next(errorMessage(404, "There isn't any post with id"));

    if (req.user && !post.published && !post.author.equals(req.user._id.toString())) {
      return next(errorMessage(400, "Cannot view on published posts unless its yours"));
    }
    await post.populate("author", getAuthorFields());

    res.status(200).json({
      message: `${req.user?.name} here is ${post.title}`,
      post: post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getArticleById(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await PostModel.findOne({
      _id: req.params.id,
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
}

export async function getArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await PostModel.find().populate("author", getAuthorFields()).exec();
    res.status(200).json({ message: "Here are all the posts", posts });
  } catch (error) {
    next(error);
  }
}

export async function deleteArticleById(
  req: Request,
  res: Response,
  next: NextFunction
) {}
