import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin only
router.get("/admin", verifyToken, (req, res) => {
  res.json({ message: "welcome Admin" });
});

// Admin and manager only
router.get("/manager", verifyToken, (req, res) => {
  res.json({ message: "welcome Manager" });
});

//All access
router.get("/user", verifyToken, (req, res) => {
  res.json({ message: "welcome user" });
});

export default router;
