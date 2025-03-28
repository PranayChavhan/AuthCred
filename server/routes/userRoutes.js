import express from "express";
import { getUserDetails } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

router.get("/me", authMiddleware, getUserDetails); // Protect this route

export default router;
