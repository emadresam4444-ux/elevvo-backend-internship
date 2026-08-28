import express from "express";
import type { Request, Response, NextFunction } from "express";
const app = express();
import userRoute from "./routes/user";
import { globalErrorHandler } from "./middleware/GlobalErrorHandler";
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use(globalErrorHandler);
export default app;
