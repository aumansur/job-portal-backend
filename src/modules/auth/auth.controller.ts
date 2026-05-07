import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { User } from "../user/user.model";


// 🔐 Register
const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});


// 🔐 Login (FIXED)
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 🔍 find user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User not found",
    });
  }

  // 🔥 inactive block
  if (!user.isActive) {
    return sendResponse(res, {
      statusCode: 403,
      success: false,
      message: "Account deactivated",
    });
  }

  // 🔐 password check
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Invalid credentials",
    });
  }

  // 🔑 token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  // ✅ SAFE REMOVE PASSWORD (NO DELETE ERROR)
  const userObj = user.toObject();
  const { password: _password, ...userData } = userObj;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: {
      token,
      user: userData,
    },
  });
});


// 🔄 Refresh Token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const accessToken = await AuthService.refreshTokenService(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token refreshed successfully",
    data: { accessToken },
  });
});


// 🔐 Forgot Password
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const token = await AuthService.forgotPassword(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reset token generated",
    data: { token },
  });
});


// 🔐 Reset Password
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, password } = req.body;

  await AuthService.resetPassword(token, password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password updated successfully",
  });
});


// 🚪 Logout
const logout = catchAsync(async (req: Request, res: Response) => {
  await AuthService.logoutUser();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged out successfully",
  });
});


// ✅ FINAL EXPORT
export const AuthController = {
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  logout,
};