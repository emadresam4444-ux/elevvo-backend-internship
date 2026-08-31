import { FAIL, SUCCESS } from "../utils/HttpStatusText";
import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../utils/asyncWrapper";
import User from "../model/userModel";
import AppError from "../utils/AppError";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateUserInput = (body: any, isCreate: boolean) => {
  const { name, email, password, role } = body;

  if (isCreate || name !== undefined) {
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      throw new AppError("Name must be at least 2 characters long", 400, FAIL);
    }
  }

  if (isCreate || email !== undefined) {
    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      throw new AppError("Please provide a valid email address", 400, FAIL);
    }
  }

  if (isCreate || password !== undefined) {
    if (!password || typeof password !== "string" || password.length < 6) {
      throw new AppError(
        "Password must be at least 6 characters long",
        400,
        FAIL,
      );
    }
  }

  if (role !== undefined) {
    if (role !== "user" && role !== "admin") {
      throw new AppError("Role must be either 'user' or 'admin'", 400, FAIL);
    }
  }
};

const getUsers = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find().select("-password");

    res.status(200).json({
      status: SUCCESS,
      results: users.length,
      data: { users },
    });
  },
);

const getUserById = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = String(req.params.id ?? "");

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return next(new AppError("Invalid user id", 400, FAIL));
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return next(new AppError("User not found", 404, FAIL));
    }

    res.status(200).json({
      status: SUCCESS,
      data: { user },
    });
  },
);

const createUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    validateUserInput(req.body, true);

    const { name, email, password, role = "user" } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return next(new AppError("User already exists", 400, FAIL));
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
    });

    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      status: SUCCESS,
      data: { user: safeUser },
    });
  },
);

const updateUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = String(req.params.id ?? "");

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return next(new AppError("Invalid user id", 400, FAIL));
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return next(
        new AppError("Please provide at least one field to update", 400, FAIL),
      );
    }

    validateUserInput(req.body, false);

    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("User not found", 404, FAIL));
    }

    const { name, email, password, role } = req.body;

    if (name !== undefined) user.name = name.trim();
    if (email !== undefined) user.email = email.trim().toLowerCase();
    if (password !== undefined) user.password = password;
    if (role !== undefined) user.role = role;

    await user.save();

    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      status: SUCCESS,
      data: { user: safeUser },
    });
  },
);

const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = String(req.params.id ?? "");

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return next(new AppError("Invalid user id", 400, FAIL));
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(new AppError("User not found", 404, FAIL));
    }

    res.status(200).json({
      status: SUCCESS,
      message: "User deleted successfully",
      data: { user },
    });
  },
);

export { getUsers, getUserById, createUser, updateUser, deleteUser };
