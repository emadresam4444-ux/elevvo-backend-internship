import express from "express";
import { observability } from "./middleware/observability.js";
const app = express();
app.use(express.json());
app.use(observability);
app.use("/api/users", (req, res, next) => {
    res.end("welcome to my server");
});
export default app;
//# sourceMappingURL=app.js.map