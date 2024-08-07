/** @format */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/article";
import UserModel, { IUser } from "./model/user";
import session from "express-session";
import "./stratetgies/google";
import "./stratetgies/local";
import errorHandler from "./middleware/error";
import mongoStore from "connect-mongo";

dotenv.config();

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

mongoose
  .connect(process.env.DB_URI as string)
  .then((data) => console.log(`connected to database ${data.Document.name}`))
  .catch((err) => console.log(err));

const app = express();
const port = parseInt(process.env.PORT as string) || 8080;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    name: "auth",
    store: mongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
passport.serializeUser(function (user: any, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await UserModel.findOne({ _id: id });
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/article", postRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res, next) => {
  res.send(
    `<div style='margin: 0; padding: 10px; width: 100%; height: 100vh; display: flex; color: white; background: black; align-items: center; justify-content: center;'><h1>Welcome to the narrate server, I am the reason why narrate do cool stuff</h1><div>`
  );
});

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`http://localhost:${port}/`);
});
