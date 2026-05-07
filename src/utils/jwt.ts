import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// 🔥 TYPE (BEST PRACTICE)
export interface IJwtPayload extends JwtPayload {
  id: string;
  role: "admin" | "employer" | "user";
}

// 🔐 Access Token
export const createAccessToken = (payload: IJwtPayload) => {
  if (!config.jwt_secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      id: payload.id,
      role: payload.role.toLowerCase(), // 🔥 IMPORTANT FIX
    },
    config.jwt_secret,
    {
      expiresIn: "1d",
    }
  );
};

// 🔐 Refresh Token
export const createRefreshToken = (payload: IJwtPayload) => {
  if (!config.refresh_secret) {
    throw new Error("REFRESH_SECRET is not defined");
  }

  return jwt.sign(
    {
      id: payload.id,
      role: payload.role.toLowerCase(), // 🔥 SAME FIX
    },
    config.refresh_secret,
    {
      expiresIn: "7d",
    }
  );
};

// 🔍 Verify Access Token
export const verifyAccessToken = (token: string): IJwtPayload => {
  if (!config.jwt_secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.verify(token, config.jwt_secret) as IJwtPayload;
};

// 🔍 Verify Refresh Token
export const verifyRefreshToken = (token: string): IJwtPayload => {
  if (!config.refresh_secret) {
    throw new Error("REFRESH_SECRET is not defined");
  }

  return jwt.verify(token, config.refresh_secret) as IJwtPayload;
};