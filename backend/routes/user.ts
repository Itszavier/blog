/** @format */

import { Router } from "express";
import cloudinary from "../cloudinaryConfig";
import multer, { memoryStorage } from "multer";
import ensureAuthenticated from "../middleware/checkauth";

import {
  followUser,
  getAllUsers,
  getIsAvailable,
  getUserById,
  getUserByUsername,
  unFollowUser,
  updateProfile,
} from "../controller/user";

const router = Router();

/*interface IFollowersAndFollowing {
  _id: string;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
}
*/

router.get("/", getAllUsers);
router.get("/id/:id", getUserById);
router.get("/username/:username", getUserByUsername);

const profileUpload = multer();
router.put(
  "/update/profile",
  ensureAuthenticated,
  profileUpload.single("profileImage"),
  updateProfile
);
router.put("/follow", ensureAuthenticated, followUser);
/// Route for unfollowing a user
router.put("/unfollow", ensureAuthenticated, unFollowUser);
router.get("/isAvailable/username/:username", getIsAvailable);

export default router;
