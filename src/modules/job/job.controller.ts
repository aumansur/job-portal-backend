import { Request, Response } from "express";
import * as JobService from "./job.service";

// 🔥 CREATE
export const createJob = async (req: any, res: Response) => {
  try {
    const result = await JobService.createJob(req.body, req.user.id);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔥 GET JOBS (FIXED 🔥)
export const getJobs = async (req: any, res: Response) => {
  try {
    const user = req.user || {}; // ✅ FIX

    const result = await JobService.getJobs(req.query, user);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("GET JOB ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch jobs",
    });
  }
};

// 🔥 UPDATE
export const updateJob = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const result = await JobService.updateJob(id, req.body, req.user);

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔥 DELETE
export const deleteJob = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    await JobService.deleteJob(id, req.user);

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (err: any) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};
