/** @format */

import { Router } from "express";
import ensureAuthenticated from "../middleware/checkauth";
import { heroImageUpload } from "../multer/file";

import {
  createArticle,
  unLikeArticle,
  getArticleById,
  getArticleByEncodedTitle,
  getEditable,
  getUserArticles,
  likeArticle,
  publishArticle,
  getArticles,
} from "../controller/article";

const router = Router();

export const getAuthorFields = (custom?: string) => {
  return custom || "name username bio profileImage";
};

router.get("/", getArticles);

router.get("/one/:id", getArticleById);

router.get("/fetch/publicView/:encodedTitle/:handle", getArticleByEncodedTitle);

router.get("/user/:id", ensureAuthenticated, getUserArticles);

router.get("/editable/:id", ensureAuthenticated, getEditable);

router.post("/create", ensureAuthenticated, createArticle);

router.post(
  "/publish/:id",
  ensureAuthenticated,
  heroImageUpload.single("heroImage"),
  publishArticle
);
router.put("/like/:postId", ensureAuthenticated, likeArticle);

router.put("/unlike/:postId", ensureAuthenticated, unLikeArticle);

export default router;
