import express from "express";

import authRoutes from "../modules/auth/auth.route";
import userRoutes from "../modules/user/user.route";
import jobRoutes from "../modules/job/job.route";
import applicationRoutes from "../modules/application/application.route";
import dashboardRoutes from "../modules/dashboard/dashboard.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
