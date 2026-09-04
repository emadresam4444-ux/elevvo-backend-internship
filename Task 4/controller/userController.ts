import { FAIL, SUCCESS } from "../utils/HttpStatusText";
import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { asyncWrapper } from "../utils/asyncWrapper";
import AppError from "../utils/AppError";
import { IUser } from "../model/userModel";
import User from "../model/userModel";

const getUsers = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find().select("+password");

    res.status(200).json({
      status: SUCCESS,
      results: users.length,
      data: { users },
    });
  },
);

const getUserById = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: FAIL,
        message: "User Not Exist",
      });
    }
    res.status(200).json({
      status: SUCCESS,
      data: { user },
    });
  },
);

const createUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new AppError("User Already Exist", 400, FAIL));
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      status: SUCCESS,
      data: { user },
    });
  },
);

const updateUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return next(new AppError("Please provide data to update", 400, FAIL));
    }
    if (email) {
      const userWithEmail = await User.findOne({ email, _id: { $ne: userId } });
      if (userWithEmail) {
        return next(new AppError("User Already Exist", 400, FAIL));
      }
    }
    const updateData: Partial<IUser> = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(new AppError("User Not Exist", 404, FAIL));
    }

    res.status(200).json({
      status: SUCCESS,
      data: { user: updatedUser },
    });
  },
);

const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(new AppError("User Not Exist", 404, FAIL));
    }

    res.status(200).json({
      status: SUCCESS,
      message: "User deleted successfully",
      data: {},
    });
  },
);

export { getUsers, getUserById, createUser, updateUser, deleteUser };
