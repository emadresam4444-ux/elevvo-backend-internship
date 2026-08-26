import express from "express";
import type { Request, Response, NextFunction } from "express";
import { observability } from "./middleware/observability.js";
import userRoutes from "./Routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use(observability);
app.use("/api/user", userRoutes);

export default app;
