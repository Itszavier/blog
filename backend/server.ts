/** @format */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/auth";
import session from "express-session";
import "./stratetgies/google";

dotenv.config();

mongoose
  .connect(process.env.DB_URI as string)
  .then((data) => console.log(`connected to database ${data.Document.name}`))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 8080;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["https://nht55j-5173.csb.app", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
