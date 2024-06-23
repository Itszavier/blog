/** @format */

import { NextFunction, Request, Response } from "express";
import z from "zod";
import UserModel from "../model/user";
import { errorMessage } from "../middleware/error";
import PostModel from "../model/post";
import uploadImageFile from "../utils";
import { getAuthorFields } from "../routes/posts";

/**
 * @description route handler for publishing articles
 */
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
