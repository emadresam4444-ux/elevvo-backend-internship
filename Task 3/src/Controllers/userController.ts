import type { Request, Response, NextFunction } from "express";
import { users } from "../data/users.js";
import { SUCCESS, FAIL, ERROR } from "../utils/HttpStatusText.js";
import { getUserById } from "../services/userService.js";
const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: SUCCESS,
    data: users,
  });
};
const getUser = (req: Request, res: Response, next: NextFunction) => {
  const user = getUserById(Number(req.params.id));

  res.status(200).json({
    status: SUCCESS,
    data: user,
  });
};

export { getUsers, getUser };
