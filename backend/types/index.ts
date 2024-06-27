/** @format */

import { Schema } from "mongoose";

export interface Follow {
  _id: string | Schema.Types.ObjectId;
  name: string;
  username: string;
  bio: string;
}
