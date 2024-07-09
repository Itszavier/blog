import mongoose, { Document, Schema, Model, model } from "mongoose";

// Interface for defining the session document
interface ISession extends Document {
  _id: string;
  timestamp: Date;
  expires: Date;
  sessionToken: string;
  userId: string;
}

// Define mongoose schema for Session
const SessionSchema: Schema = new Schema({
 
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

const SessionModel =
  (mongoose.models.Session as mongoose.Model<ISession>) ||
  model("Session", SessionSchema);

export default SessionModel;
