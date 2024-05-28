/** @format */

import { Schema, SchemaTypes, model } from "mongoose";
import generateUniqueId from "generate-unique-id";
import { generateFromEmail } from "unique-username-generator";

export interface IUser extends Document {
  _id: string;
  name: string;
  username?: string;
  bio?: string;
  bannerUrl?: string;
  profileImage: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  _id: {
    type: SchemaTypes.String,
    default: generateUniqueId({
      length: 17,
      excludeSymbols: ["0", "-"],
    }),
  },

  name: { type: SchemaTypes.String, required: true },

  username: { type: SchemaTypes.String },

  profileImage: {
    type: SchemaTypes.String,
    default: "https://avatar.iran.liara.run/public/boy?username=Ash",
    required: true,
  },
  email: { type: SchemaTypes.String, required: true },

  bio: {
    type: SchemaTypes.String,
  },

  bannerUrl: {
    type: SchemaTypes.String,
  },
});

userSchema.pre("save", function (next) {
  if (this.username) {
    next();
  } else {
    this.username = generateFromEmail(this.email);
    next();
  }
});
const UserModel = model("User", userSchema, "users");

export default UserModel;
