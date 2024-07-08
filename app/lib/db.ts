import mongoose from "mongoose";

let connection = mongoose.connection.readyState;

export async function connectDB() {
  if (connection === 1) {
    console.log("already connected to database", connection);
    return;
  }

  mongoose
    .connect(process.env.DB_URI as string)
    .then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose.connection;
    })
    .catch((err) => console.error("Error connecting to MongoDB", err));
}
