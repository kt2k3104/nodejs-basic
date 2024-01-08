import db from "../models/index.model";

import { validationResult } from "express-validator";
import uploadController from "./upload.controllers";

const postController = {
  addPost: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation failed, entered data is incorrect.");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }
    try {
      const { title, content, imageURL } = req.body;

      console.log(req.userId);

      const post = await db.Post.create({
        title,
        content,
        userid: req.userId,
        imageURL,
      });

      res.status(201).json({
        message: "create post success",
        post,
      });
    } catch (error) {
      next(error);
    }
  },
  editPost: async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const err = new Error("Validation failed, entered data is incorrect.");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }
    try {
      const id = req.params.id;
      const { title, content } = req.body;

      const post = await db.Post.findByPk(id);

      if (+post.userid !== +req.userId) {
        const error = new Error("not allowed edit post.");
        throw error;
      }

      const postUpdated = await post.update({
        title,
        content,
      });

      res.json({
        message: "update post success",
        postUpdated,
      });
    } catch (error) {
      next(error);
    }
  },
  deletePost: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation failed, entered data is incorrect.");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }
    try {
      const id = req.params.id;

      const post = await db.Post.findByPk(id);

      if (req.userId !== post.userid) {
        const err = new Error("khong phai post cua may");
        err.statusCode = 401;
        throw err;
      }

      const PostDeleted = await db.Post.destroy({
        where: {
          id: id,
        },
      });

      const publicId =
        "res/images" + post.imageURL.split("res/images")[1].split(".")[0];

      await uploadController.deleteImg(publicId);

      res.json({
        message: "delete post success",
        PostDeleted,
      });
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation failed, entered data is incorrect.");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }
    try {
      const id = req.params.id;
      const post = await db.Post.findByPk(id);

      console.log(typeof id);

      res.json({
        message: "get post by id success",
        post,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllPost: async (req, res, next) => {
    try {
      const posts = await db.Post.findAll();

      res.json({
        message: "get all post success",
        posts,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default postController;
