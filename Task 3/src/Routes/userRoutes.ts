import { Router } from "express";
import { getUsers, getUser } from "../Controllers/userController.js";
const router = Router();
router.route("/").get(getUsers);
router.route("/:id").get(getUser);

export default router;
