/** @format */

import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = new Schema({
  _id: { type: SchemaTypes.ObjectId },
  name: { type: SchemaTypes.String, required: true },
  avater: { type: SchemaTypes.String },
  email: { type: SchemaTypes.String, required: true },
  password: { type: SchemaTypes.String, required: true },
});

const UserModel = model("model", userSchema);

export default UserModel;
