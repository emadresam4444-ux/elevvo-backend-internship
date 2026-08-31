import express from "express";
import { login, register } from "../controller/authController";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/userController";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
