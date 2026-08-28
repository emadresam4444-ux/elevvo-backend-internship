import type { Request, Response, NextFunction } from "express";
import { users } from "../data/users.js";
import { SUCCESS, FAIL, ERROR } from "../utils/HttpStatusText.js";
import {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../services/userService.js";
import type { User } from "../types/types.js";
const getUsers = (req: Request, res: Response, next: NextFunction) => {
  if (users.length !== 0) {
    res.status(200).json({
      Results: users.length,
      status: SUCCESS,
      data: users,
    });
  } else {
    res.status(404).json({
      status: FAIL,
      message: "users doesn't exist",
    });
  }
};
const getUser = (req: Request, res: Response, next: NextFunction) => {
  const user = getUserById(Number(req.params.id));
  if (user) {
    res.status(200).json({
      status: SUCCESS,
      data: user,
    });
  } else {
    res.status(404).json({
      status: FAIL,
      message: "user doesn't exist",
    });
  }
};
const addUser = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;
  if (user) {
    const newUser: User[] = createUser(user);
    return res.status(201).json({
      status: SUCCESS,
      data: newUser,
    });
  } else {
    res.status(404).json({
      status: FAIL,
      message: "please , add user",
    });
  }
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId: number = Number(req.params.id);
  const { name, email, password } = req.body;
  const updatedUser = updateUserById(userId, { name, email, password });
  res.status(200).json({
    status: SUCCESS,
    data: updatedUser,
  });
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId: number = Number(req.params.id);
  const isDeleted = deleteUserById(userId);
  if (!isDeleted) {
    return res.status(404).json({
      status: FAIL,
      message: "User not found",
    });
  }
  return res.status(200).json({
    status: SUCCESS,
    message: "user deleted successfully",
  });
};
export { getUsers, getUser, addUser, updateUser, deleteUser };
