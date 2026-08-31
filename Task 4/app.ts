import express from "express";
import userRoute from "./routes/userRoutes";
import { globalErrorHandler } from "./middleware/GlobalErrorHandler";

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use(globalErrorHandler);

export default app;
