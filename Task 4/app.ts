import express, { Request, Response, NextFunction } from "express";
import userRoute from "./routes/userRoutes";
import { globalErrorHandler } from "./middleware/GlobalErrorHandler";
import { SUCCESS, FAIL } from "./utils/HttpStatusText";

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: FAIL,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});
export default app;
