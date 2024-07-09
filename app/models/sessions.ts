import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for defining the session document
interface ISession extends Document {
  id: string;
  timestamp: Date;
  expires: Date;
  sessionToken: string;
  userId: string;
}

// Define mongoose schema for Session
const SessionSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  sessionToken: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// Define mongoose model for Session
const SessionModel: Model<ISession> = mongoose.model<ISession>(
  "Session",
  SessionSchema
);

export default SessionModel;
