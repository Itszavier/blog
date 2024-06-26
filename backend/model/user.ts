/** @format */

import { Schema, SchemaTypes, model, Document } from "mongoose";
import generateUniqueId from "generate-unique-id";
import { generateUsername, generateFromEmail } from "unique-username-generator";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId | string;
  name: string;
  username: string;
  bio?: string;
  pronouns?: string;
  bannerUrl?: string;
  profileImage: {
    id: string;
    storage: "url" | "cloud";
    url: string;
  };
  email: string;
  socials: string[];
  occupation?: string;
  followers: Schema.Types.ObjectId[] | string[];
  following: Schema.Types.ObjectId[] | string[];
}

const userSchema = new Schema<IUser>({
  name: { type: SchemaTypes.String, required: true },

  username: { type: SchemaTypes.String, unique: true },

  profileImage: {
    url: {
      type: SchemaTypes.String,
      default: "https://avatar.iran.liara.run/public/boy?username=Ash",
    },

    id: {
      type: SchemaTypes.String,
      default: "",
    },

    storage: {
      type: SchemaTypes.String,
      enum: ["cloud", "url"],
      defualt: "url",
    },
  },
  email: { type: SchemaTypes.String, required: true, unique: true },

  bio: {
    type: SchemaTypes.String,
  },
  occupation: {
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

userSchema.pre("save", async function (next) {
  if (this.username) {
    next();
  } else {
    const generateUniqueUsername = async (): Promise<string> => {
      let username = generateFromEmail(this.email, 6);
      let user = await UserModel.findOne({ username });

      while (user) {
        username = generateUsername("_", 3, 8);
        user = await UserModel.findOne({ username });
      }

      return username;
    };

    this.username = await generateUniqueUsername();
    next();
  }
});

const UserModel = model<IUser>("User", userSchema, "users");

export default UserModel;
