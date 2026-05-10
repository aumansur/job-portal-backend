import express from "express";
import { auth } from "../../middlewares/auth";
import { createJob, getJobs, updateJob, deleteJob } from "./job.controller";

const router = express.Router();

// 🔥 PUBLIC (optional auth)
router.get("/", getJobs);

// 🔥 MUST PROTECT
router.post("/", auth("admin", "employer"), createJob);

// 🔥 UPDATE
router.patch("/:id", auth("admin", "employer"), updateJob);

// 🔥 DELETE
router.delete("/:id", auth("admin", "employer"), deleteJob);

export default router;
