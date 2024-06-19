/** @format */

import generateUniqueId from "generate-unique-id";
import mongoose, { Schema, SchemaTypes, Document } from "mongoose";
import { unsupportedSymbols } from "../utils";

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
  };

  heroImage: {
    storage: "cloud" | "url";
    url: string;
    id: string;
  };
  likes: Schema.Types.ObjectId[];
  dislikes: Schema.Types.ObjectId[];
  handle: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export interface IPostSchema extends IPost, Document {}

// Mongoose schema definition
const postSchema = new Schema<IPostSchema>({
  type: {
    type: SchemaTypes.String,
    defualt: "Article",
  },
  title: {
    type: SchemaTypes.String,
    required: true,
  },
  subtitle: {
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
      default: "",
    },
    text: {
      type: SchemaTypes.String,
      default: "",
    },
  },

  heroImage: {
    storage: {
      type: SchemaTypes.String,
      defualt: "cloud",
      enum: ["cloud", "url"],
    },
    url: {
      type: SchemaTypes.String,
      default: "",
    },

    id: {
      type: SchemaTypes.String,
      default: "",
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
    default: false,
  },

  handle: {
    type: SchemaTypes.String,
    immutable: true,
    default: () => generateUniqueId({ excludeSymbols: unsupportedSymbols, length: 7 }),
  },

  likes: {
    type: [SchemaTypes.ObjectId],
    default: [],
  },

  dislikes: {
    type: [SchemaTypes.ObjectId],
    default: [],
  },
});

// Creating the Mongoose model

const PostModel = mongoose.model("post", postSchema, "Posts");

export default PostModel;
