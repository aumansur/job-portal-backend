import { Application } from "./application.model";


// 🔥 Apply Job
export const applyJobService = async (userId: string, payload: any) => {
  const { job, expectedSalary, coverLetter } = payload;

  // ❌ duplicate prevent
  const exists = await Application.findOne({
    user: userId,
    job,
  });

  if (exists) {
    throw new Error("Already applied for this job");
  }

  const application = await Application.create({
    user: userId,
    job,
    expectedSalary,
    coverLetter,
  });

  return application;
};


// 🔥 Get My Applications
export const getMyApplicationsService = async (userId: string) => {
  return Application.find({ user: userId })
    .populate("job")
    .sort({ createdAt: -1 });
};


// 🔥 Admin → All Applications
export const getAllApplicationsService = async () => {
  return Application.find()
    .populate("job")
    .populate("user")
    .sort({ createdAt: -1 });
};


// 🔥 Update Status (Accept / Reject)
export const updateApplicationStatusService = async (
  id: string,
  status: string
) => {
  const application = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};