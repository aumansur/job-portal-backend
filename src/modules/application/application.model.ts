// src/modules/application/application.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  expectedSalary: number;
  coverLetter?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

const applicationSchema = new Schema<IApplication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    expectedSalary: {
      type: Number,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

export const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema,
);
