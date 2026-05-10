// src/modules/job/job.model.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  description?: string;
  location?: string;
  salary?: number;
  jobType: "Full-time" | "Part-time" | "Remote" | "Internship";
  experience?: string;
  skills?: string[];
  deadline?: Date;
  status: "active" | "closed";
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  applicantsCount: number;
  createdBy: mongoose.Types.ObjectId;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    salary: {
      type: Number,
      default: 0,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Internship"],
      default: "Full-time",
    },

    experience: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    deadline: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },

    requirements: {
      type: String,
      default: "",
    },

    responsibilities: {
      type: String,
      default: "",
    },

    benefits: {
      type: String,
      default: "",
    },

    applicantsCount: {
      type: Number,
      default: 0,
    },

    // 🔥 IMPORTANT FIX
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Job = mongoose.model<IJob>("Job", jobSchema);
