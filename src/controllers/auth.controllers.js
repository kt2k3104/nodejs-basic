import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../models/index.model";

const authController = {
  postSignUp: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const hashedPw = await bcrypt.hash(password, 12);

      const user = await db.User.create({
        email,
        password: hashedPw,
      });

      user.password = "";

      res.status(201).json({
        message: "create user success.",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  postSignIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        const err = new Error("A user with email could not be found!");
        err.statusCode = 401;
        throw err;
      }

      console.log(user);

      const isMathch = await bcrypt.compare(password, user.password);

      if (!isMathch) {
        const err = new Error("Incorrect email or password");
        err.statusCode = 401;
        throw err;
      }

      const access_token = jwt.sign(
        { userid: user.id, username: user.name },
        "hehe",
        {
          expiresIn: "1h",
        }
      );

      res.json({
        message: "login thanh cong",
        token: access_token,
      });
    } catch (error) {
      next(error);
    }
  },

  postChangePassword: async (req, res, next) => {
    try {
      const { password, newpassword } = req.body;
      const user = await db.User.findByPk(req.userId);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        const err = new Error("password does not match");
        err.statusCode = 401;
        throw err;
      }
      const hashedPw = await bcrypt.hash(newpassword, 12);
      await user.update({
        password: hashedPw,
      });

      res.json({
        message: "update password success",
      });
    } catch (error) {
      next(error);
    }
  },

  postResetPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = db.User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        const err = new Error("User not found!");
        err.statusCode = 401;
        throw err;
      }

      res.json({
        message: `Cho phep doi mat khau`,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
