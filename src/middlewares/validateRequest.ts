import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (err: any) {
      next({
        statusCode: 400,
        message: err.errors[0].message,
      });
    }
  };