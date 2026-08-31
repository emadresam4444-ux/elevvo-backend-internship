import { ERROR, FAIL, SUCCESS } from "../utils/HttpStatusText";
import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../utils/asyncWrapper";
import User from "../model/userModel";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
const register = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return next(new AppError("user already exist", 400, FAIL));
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (!process.env.JWT_SECRET_KEY) {
      return next(
        new AppError(
          "JWT_SECRET_KEY is not defined in environment variables",
          500,
          ERROR,
        ),
      );
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h",
      },
    );
    res.status(201).json({
      status: SUCCESS,
      data: { name, email },
      token,
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

    if (!validPassword) {
      return next(new AppError("Invalid email or password", 400, FAIL));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" },
    );
    res.status(200).json({
      status: SUCCESS,
      token,
    });
  },
);

export { register, login };
