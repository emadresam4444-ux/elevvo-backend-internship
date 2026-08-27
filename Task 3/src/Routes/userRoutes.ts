import { Router } from "express";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
} from "../Controllers/userController.js";
const router = Router();
router.route("/").get(getUsers).post(addUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
export default router;
