import express from "express";

import postController from "../controllers/post.controllers.js";
import postValidation from "../validations/post.validation.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

const {
  addPostValidate,
  deletePostValidate,
  editPostValidate,
  getPostValidate,
} = postValidation;

router.post("/", isAuth, addPostValidate, postController.addPost);
router.post("/:id", isAuth, editPostValidate, postController.editPost);
router.get("/:id", getPostValidate, postController.getPost);
router.delete("/:id", isAuth, deletePostValidate, postController.deletePost);
router.get("/", postController.getAllPost);

export default router;
