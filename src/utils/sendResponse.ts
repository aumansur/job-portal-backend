import { Response } from "express";

export const sendResponse = (res: Response, data: any) => {
  res.status(data.statusCode).json(data);
};