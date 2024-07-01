/** @format */

import mongoose, { Document, Schema, SchemaTypes, Model } from "mongoose";

// Define the types of tokens
export const tokenTypes = ["emailVerification", "passwordReset", "billing"] as const;

interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  type: (typeof tokenTypes)[number];
  expires: Date;
  used: boolean;
}

const TokenSchema: Schema<IToken> = new mongoose.Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: SchemaTypes.String,
    required: true,
  },
  type: {
    type: SchemaTypes.String,
    enum: tokenTypes,
    required: true,
  },
  expires: {
    type: SchemaTypes.Date,
    required: true,
    index: { expires: "1h" }, // Set TTL index to expire documents 1 hour after the expires field
  },
  used: {
    type: SchemaTypes.Boolean,
    default: false,
  },
});

// Index to ensure unique token per user per type
TokenSchema.index({ userId: 1, type: 1, token: 1 }, { unique: true });

const TokenModel: Model<IToken> = mongoose.model<IToken>("Token", TokenSchema);

export default TokenModel;
