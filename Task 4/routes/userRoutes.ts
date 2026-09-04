import express from "express";
import { login, register } from "../controller/authController";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/userController";
import { authenticateToken } from "../middleware/authenticateToken";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(authenticateToken, getUsers).post(createUser);
router
  .route("/:id")
  .get(authenticateToken, getUserById)
  .patch(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser);

export default router;
