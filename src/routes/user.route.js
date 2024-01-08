import express from "express";
import userController from "../controllers/user.controllers";
const router = express.Router();

router.post("/", userController.postUser);
router.post("/:id", userController.putEditUser);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getAllUser);
// router.get("/add-user", userController.getAddUser);

export default router;
