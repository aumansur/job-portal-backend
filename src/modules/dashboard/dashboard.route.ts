import express from "express";
import { auth } from "../../middlewares/auth";
import {
  getAdminStats,
  getUserStats,
  getEmployerStats,
} from "./dashboard.controller";

const router = express.Router();

// 👑 ADMIN
router.get("/admin-stats", auth("admin"), getAdminStats);

// 👤 USER
router.get("/user-stats", auth("user"), getUserStats);

// 🏢 EMPLOYER
router.get("/employer-stats", auth("employer"), getEmployerStats);

export default router;
