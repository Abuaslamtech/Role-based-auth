import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config.js";
import router from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());

// middlewares

// connect DB
connectDb();

// connect routes
app.use("/api", router);
app.use("/api/users", userRoutes);
// start server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
