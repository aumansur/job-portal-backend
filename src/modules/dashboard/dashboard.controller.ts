import { Request, Response } from "express";
import { Job } from "../job/job.model";
import { Application } from "../application/application.model";
import { User } from "../user/user.model";


// ======================= 👑 ADMIN =======================
export const getAdminStats = async (req: any, res: Response) => {
  try {
    const role = req.user?.role?.toLowerCase();

    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin allowed",
      });
    }

    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const pending = await Application.countDocuments({ status: "PENDING" });
    const accepted = await Application.countDocuments({ status: "ACCEPTED" });
    const rejected = await Application.countDocuments({ status: "REJECTED" });

    const recentApplications = await Application.find()
      .populate("job")
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalJobs,
        totalApplications,
        pending,
        accepted,
        rejected,
        recentApplications,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load admin stats",
    });
  }
};


// ======================= 👤 USER =======================
export const getUserStats = async (req: any, res: Response) => {
  try {
    const role = req.user?.role?.toLowerCase();
    const userId = req.user?.id;

    if (role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only user allowed",
      });
    }

    const totalApplied = await Application.countDocuments({
      user: userId,
    });

    const pending = await Application.countDocuments({
      user: userId,
      status: "PENDING",
    });

    const accepted = await Application.countDocuments({
      user: userId,
      status: "ACCEPTED",
    });

    const rejected = await Application.countDocuments({
      user: userId,
      status: "REJECTED",
    });

    const recentApplications = await Application.find({
      user: userId,
    })
      .populate("job")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalApplied,
        pending,
        accepted,
        rejected,
        recentApplications,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load user stats",
    });
  }
};


// ======================= 🏢 EMPLOYER =======================
export const getEmployerStats = async (req: any, res: Response) => {
  try {
    const role = req.user?.role?.toLowerCase();
    const employerId = req.user?.id;

    if (role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employer allowed",
      });
    }

    // employer এর job গুলো
    const myJobs = await Job.find({ createdBy: employerId }).select("_id");

    const jobIds = myJobs.map((job) => job._id);

    const totalJobs = jobIds.length;

    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const pending = await Application.countDocuments({
      job: { $in: jobIds },
      status: "PENDING",
    });

    const accepted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "ACCEPTED",
    });

    const rejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "REJECTED",
    });

    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("job")
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalJobs,
        totalApplicants,
        pending,
        accepted,
        rejected,
        recentApplications,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load employer stats",
    });
  }
};