import { Schema, SchemaTypes, model, Document } from "mongoose";

// Interface for Authentication Token document
export interface Account extends Document {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
}

// Mongoose schema definition for Authentication Token
const accountSchema = new Schema<Account>({
  id: { type: SchemaTypes.String, required: true },
  userId: { type: SchemaTypes.String, required: true },
  type: { type: SchemaTypes.String, required: true },
  provider: { type: SchemaTypes.String, required: true },
  providerAccountId: { type: SchemaTypes.String, required: true },
  refresh_token: { type: SchemaTypes.String, required: true },
  access_token: { type: SchemaTypes.String, required: true },
  expires_at: { type: SchemaTypes.Number, required: true },
  token_type: { type: SchemaTypes.String, required: true },
  scope: { type: SchemaTypes.String },
  id_token: { type: SchemaTypes.String },
});

// Creating the Mongoose model for Authentication Token
const AccountModel = model<Account>("AuthToken", accountSchema);

export default AccountModel;
