import { Request, Response } from "express";
import {
  applyJobService,
  getMyApplicationsService,
  getAllApplicationsService,
  updateApplicationStatusService,
} from "./application.service";


// 🔥 Apply Job
export const applyJob = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const result = await applyJobService(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Applied successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// 🔥 My Applications
export const getMyApplications = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const result = await getMyApplicationsService(userId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};


// 🔥 Admin → All Applications
export const getAllApplications = async (req: any, res: Response) => {
  try {
    const result = await getAllApplicationsService();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};


// 🔥 Accept / Reject
export const updateApplicationStatus = async (req: any, res: Response) => {
  try {
    const role = req.user?.role?.toLowerCase();

    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin allowed",
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const result = await updateApplicationStatusService(id, status);

    res.json({
      success: true,
      message: "Status updated",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};