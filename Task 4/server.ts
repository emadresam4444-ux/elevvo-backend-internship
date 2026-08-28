import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running http://localhost:${PORT}/api/v1/user`);
  mongoose.connect("mongodb://localhost:27017/User");
});
