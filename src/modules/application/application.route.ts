import express from "express";
import { auth } from "../../middlewares/auth";
import {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} from "./application.controller";

const router = express.Router();

// 👤 USER APPLY
router.post("/", auth("user"), applyJob);

// 👤 MY APPLICATIONS
router.get("/me", auth("user"), getMyApplications);

// 👑 ADMIN
router.get("/", auth("admin"), getAllApplications);

// 🔥 ACCEPT / REJECT
router.patch("/:id", auth("admin"), updateApplicationStatus);

export default router;
