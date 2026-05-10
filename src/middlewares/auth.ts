import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const auth = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token",
        });
      }

      const decoded: any = jwt.verify(token, config.jwt_secret as string);

      req.user = decoded;

      const userRole = decoded.role?.toLowerCase();

      console.log("👉 USER ROLE:", userRole);
      console.log("👉 ALLOWED ROLES:", roles);

      // 🔥 FIX: roles normalize
      const normalizedRoles = roles.map((r) => r.toLowerCase());

      if (!normalizedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden - Role not allowed",
        });
      }

      next();
    } catch (error) {
      console.log("AUTH ERROR:", error);
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};
