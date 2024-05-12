/** @format */

import { Schema, SchemaTypes, model } from "mongoose";
import generateUniqueId from "generate-unique-id";

export interface IUser extends Document {
  _id: string;
  name: string;
  avater: string;
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
  
  avater: {
    type: SchemaTypes.String,
    default:
      "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon",
    required: true,
  },
  email: { type: SchemaTypes.String, required: true },
});

const UserModel = model("User", userSchema, "users");

export default UserModel;
