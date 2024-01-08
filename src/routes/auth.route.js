import express from "express";
import authController from "../controllers/auth.controllers.js";
import isAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", authController.postSignUp);
router.post("/signin", authController.postSignIn);
router.post("/change-password", isAuth, authController.postChangePassword);
router.post("/reset-password", authController.postResetPassword);

export default router;
