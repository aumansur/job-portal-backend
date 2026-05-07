import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// ✅ Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "employer" | "user";

  isActive: boolean; // 🔥 soft delete

  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

// ✅ Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔥 important for security
    },

    role: {
      type: String,
      enum: ["admin", "employer", "user"],
      default: "user",
    },

    // 🔥 SOFT DELETE FIELD
    isActive: {
      type: Boolean,
      default: true,
    },

    // 🔥 PASSWORD RESET
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

// 🔐 Password Hash
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

// 🔐 Compare Password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ✅ Model
export const User = mongoose.model<IUser>("User", userSchema);