/** @format */

import { Router } from "express";
import UserModel from "../model/user";
import verify from "../middleware/checkauth";
import { errorMessage } from "../middleware/error";

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
        avatar: user.avater,
        bio: user.bio,
        bannerUrl: user.bannerUrl,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res, next) => res.json("hello world"));

export default router;
