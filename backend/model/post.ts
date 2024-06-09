/** @format */

import mongoose, { Schema, SchemaTypes, Document } from "mongoose";

// TypeScript interface for the Post document
export interface IPost {
  type: string;
  title: string;
  subtitle: string;
  description?: string;
  tags: string[];
  author: mongoose.Types.ObjectId;
  content: {
    html: string;
    text: string;
  };
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export interface IPostSchema extends IPost, Document {}




// Mongoose schema definition
const postSchema = new Schema<IPostSchema>({
  type: {
    type: SchemaTypes.String,
    immutable: true,
    required: true,
  },
  title: {
    type: SchemaTypes.String,
    required: true,
  },
  subtitle: {
    type: SchemaTypes.String,
    required: true,
  },
  description: {
    type: SchemaTypes.String,
  },
  tags: {
    type: [SchemaTypes.String],
    default: [],
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User", 
    required: true,
  },
  content: {
    html: {
      type: SchemaTypes.String,
      required: true,
    },
    text: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
  published: {
    type: SchemaTypes.Boolean,
    required: true,
    default: false,
  },
});

// Creating the Mongoose model

const PostModel = mongoose.model("post", postSchema, "Posts");

export default PostModel;
