import { FAIL, SUCCESS } from "../utils/HttpStatusText";
import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "./../utils/asyncWrapper";
import User from "../model/user";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError";

const register = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return next(new AppError("user already exist", 400, FAIL));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: SUCCESS,
      data: { name, email },
    });
  },
);
const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400, FAIL));
    }
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("Invalid email or password", 400, FAIL));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);

    if (!validPassword) {
      return next(new AppError("Invalid email or password", 400, FAIL));
    }
    res.status(200).json({
      status: SUCCESS,
      token: {},
    });
  },
);

export { register, login };
