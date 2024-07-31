/** @format */

import mongoose, { SchemaTypes } from "mongoose";

export interface IUser extends mongoose.Schema {
  _id: mongoose.Schema.Types.ObjectId | string;
  name: string;
  username: string;
  bio?: string;
  picture?: string;
  pronouns?: string;
  bannerUrl?: string;
  email: string;
  password: string;
  socials: string[];
  occupation?: string;
  followers: mongoose.Schema.Types.ObjectId[] | string[];
  following: mongoose.Schema.Types.ObjectId[] | string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: SchemaTypes.String },

  username: { type: SchemaTypes.String, unique: true },

  picture: { type: SchemaTypes.String, unique: true },

  email: { type: SchemaTypes.String, required: true, unique: true },

  password: { type: SchemaTypes.String },

  bio: {
    type: SchemaTypes.String,
  },

  pronouns: {
    type: SchemaTypes.String,
  },

  socials: {
    type: [SchemaTypes.String],
    default: [],
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
