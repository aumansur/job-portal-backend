import crypto from "crypto";
import { User, IUser } from "../user/user.model";
import { AppError } from "../../utils/AppError";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";


// 🔐 Register
const registerUser = async (payload: Partial<IUser>) => {
  const isExist = await User.findOne({ email: payload.email });

  if (isExist) {
    throw new AppError("User already exists", 400);
  }

  const user = await User.create(payload);

  return user;
};



// 🔐 Login
const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid password", 401);
  }

  const accessToken = createAccessToken({
    id: user._id.toString(),
    role: user.role,
  });

  const refreshToken = createRefreshToken({
    id: user._id.toString(),
  });

  return {
    accessToken,
    refreshToken,
  };
};



// 🔄 Refresh Token
const refreshTokenService = async (token: string) => {
  if (!token) {
    throw new AppError("No token provided", 401);
  }

  let decoded: any;

  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const accessToken = createAccessToken({
    id: user._id.toString(),
    role: user.role,
  });

  return accessToken;
};



// 🚪 Logout
const logoutUser = async () => {
  return true;
};



// 🔐 Forgot Password
const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  return resetToken;
};



// 🔐 Reset Password
const resetPassword = async (token: string, newPassword: string) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new AppError("Invalid or expired token", 400);
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return true;
};



// 🔥 FINAL EXPORT (LoanService style)
export const AuthService = {
  registerUser,
  loginUser,
  refreshTokenService,
  logoutUser,
  forgotPassword,
  resetPassword,
};