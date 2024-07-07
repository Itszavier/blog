import mongoose from "mongoose";

export async function connectDB() {
  mongoose
    .connect(process.env.DB_URI as string)
    .then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose.connection;
    })
    .catch((err) => console.error("Error connecting to MongoDB", err));
}
