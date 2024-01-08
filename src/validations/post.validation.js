import { body, param } from "express-validator";
import db from "../models/index.model";

const postValidation = {
  addPostValidate: [
    body("title")
      .trim()
      .isLength({ max: 255 })
      .withMessage("title dai vl")
      .notEmpty()
      .withMessage("dien ho title"),
    body("content").trim().notEmpty().withMessage("dien ho content"),
  ],
  editPostValidate: [
    body("title").trim().isLength({ max: 255 }).optional(),
    body("content").trim().optional(),
    param("id")
      .trim()
      .isNumeric()
      .withMessage("dien ho so de")
      .custom(async (value) => {
        console.log("validate");
        try {
          const post = await db.Post.findByPk(+value);

          if (post == null) {
            throw new Error("post not found!!!");
          }

          return true;
        } catch (error) {
          throw error;
        }
      }),
  ],
  getPostValidate: [
    param("id")
      .trim()
      .isNumeric()
      .withMessage("dien ho so de")
      .custom((value) => {
        return +value <= 10;
      })
      .withMessage("id duoi 10 de"),
  ],
  deletePostValidate: [
    param("id").trim().isNumeric().withMessage("dien ho so de"),
  ],
};

export default postValidation;
