/** @format */

import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = new Schema({
  _id: { type: SchemaTypes.ObjectId },
  name: { type: SchemaTypes.String, required: true },
  avater: {
    type: SchemaTypes.String,
    default:
      "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon",
    required: true,
  },
  email: { type: SchemaTypes.String, required: true },
  password: { type: SchemaTypes.String, required: true },
});

const UserModel = model("model", userSchema);

export default UserModel;
