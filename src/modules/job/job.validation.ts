import { z } from "zod";

const jobBaseSchema = z.object({
  title: z.string().min(2, "Title is required"),
  company: z.string().min(2, "Company is required"),

  description: z.string().optional(),
  location: z.string().optional(),

  salary: z.number().nonnegative().optional(),

  jobType: z
    .enum(["Full-time", "Part-time", "Remote", "Internship"])
    .optional(),

  experience: z.string().optional(),

  skills: z.array(z.string()).optional(),

  deadline: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),

  status: z.enum(["active", "closed"]).optional(),

  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
});

export const createJobValidation = z.object({
  body: jobBaseSchema,
});

export const updateJobValidation = z.object({
  body: jobBaseSchema.partial(),
});
