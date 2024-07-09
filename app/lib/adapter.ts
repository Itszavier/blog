import { Adapter } from "@auth/core/adapters";
import mongoose from "mongoose";
import UserModel from "../models/user";
import AccountModel from "../models/account"; // Assuming you have an Account model
// Assuming you have a Session model

export default function MongooseAdapter(): Adapter {
  return {};
}
