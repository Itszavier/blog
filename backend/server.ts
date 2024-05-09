/** @format */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth";
dotenv.config();

mongoose
  .connect(process.env.DB_URI as string)
  .then((data) => console.log(`connected to database ${data.Document.name}`))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
