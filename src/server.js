import path from "path";

import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from "./models/index.model";
import multer from "multer";
import { v4 } from "uuid";
import cors from "cors";

import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import authRouter from "./routes/auth.route";
import uploadRouter from "./routes/upload.route";

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "res/images");
  },
  filename: (req, file, cb) => {
    cb(null, v4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "res", "images")));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/upload", uploadRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const errorData = error.data || [];
  res.status(status).json({ message, success: false, errorData });
});

app.listen("8000", () => {
  console.log("Server is running on port 8000");
});
