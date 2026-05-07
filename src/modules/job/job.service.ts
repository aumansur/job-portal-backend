import { Job } from "./job.model";

// CREATE
export const createJob = async (payload: any, userId: string) => {
  return await Job.create({
    ...payload,
    createdBy: userId,
  });
};

// 🔥 GET JOBS (FIXED)
export const getJobs = async (queryParams: any, user: any) => {
  const {
    search,
    location,
    jobType,
    minSalary,
    maxSalary,
  } = queryParams;

  const query: any = {};

  const role = user?.role?.toLowerCase();

  // 🔐 ROLE BASED FILTER
  if (role === "admin") {
    // admin সব দেখতে পারবে
  } else if (role === "employer") {
    query.createdBy = user.id; // 🔥 only own jobs
  } else {
    query.status = "active"; // 🔥 only active
  }

  // 🔍 SEARCH
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  // 📍 LOCATION
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  // 💼 JOB TYPE
  if (jobType) {
    query.jobType = jobType;
  }

  // 💰 SALARY
  if (minSalary || maxSalary) {
    query.salary = {};

    if (minSalary) query.salary.$gte = Number(minSalary);
    if (maxSalary) query.salary.$lte = Number(maxSalary);
  }

  const jobs = await Job.find(query).sort({ createdAt: -1 });

  return jobs;
};

// 🔥 UPDATE
export const updateJob = async (id: string, payload: any, user: any) => {
  const job = await Job.findById(id);

  if (!job) throw new Error("Job not found");

  const role = user.role.toLowerCase();

  if (
    role !== "admin" &&
    job.createdBy?.toString() !== user.id
  ) {
    throw new Error("Not authorized");
  }

  return await Job.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteJob = async (id: string, user: any) => {
  const job = await Job.findById(id);

  if (!job) throw new Error("Job not found");

  const role = user.role.toLowerCase();

  if (
    role !== "admin" &&
    job.createdBy?.toString() !== user.id
  ) {
    throw new Error("Not authorized");
  }

  return await Job.findByIdAndDelete(id);
};