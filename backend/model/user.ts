/** @format */

import { Schema, SchemaTypes, model, Document } from "mongoose";
import generateUniqueId from "generate-unique-id";
import { generateUsername } from "unique-username-generator";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId | string;
  name: string;
  username?: string;
  bio?: string;
  bannerUrl?: string;
  profileImage: string;
  email: string;
  followers: Schema.Types.ObjectId[] | string[];
  following: Schema.Types.ObjectId[] | string[];
}

const userSchema = new Schema<IUser>({
  name: { type: SchemaTypes.String, required: true },

  username: { type: SchemaTypes.String, unique: true },

  profileImage: {
    type: SchemaTypes.String,
    default: "https://avatar.iran.liara.run/public/boy?username=Ash",
    required: true,
  },
  email: { type: SchemaTypes.String, required: true, unique: true },

  bio: {
    type: SchemaTypes.String,
  },

  bannerUrl: {
    type: SchemaTypes.String,
  },

  following: {
    type: [SchemaTypes.ObjectId],
    ref: "User",
    default: [],
  },

  followers: {
    type: [SchemaTypes.ObjectId],
    ref: "User",
    default: [],
  },
});

userSchema.pre("save", function (next) {
  if (this.username) {
    next();
  } else {
    this.username = generateUsername("_", 3, 8);
    next();
  }
});

const UserModel = model<IUser>("User", userSchema, "users");

export default UserModel;
