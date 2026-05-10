import { z } from "zod";

export const applyJobSchema = z.object({
  body: z.object({
    job: z.string().min(1, "Job ID is required"),

    expectedSalary: z.number().min(1, "Expected salary is required"),

    coverLetter: z.string().optional(),
  }),
});

export const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
  }),
});
