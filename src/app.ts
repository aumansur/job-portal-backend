import express from "express";
import cors from "cors";

import { globalErrorHandler } from "./middlewares/errorHandler";
import router from "./routes";
import { connectDB } from "./config/db";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Job Portal Backend Running",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

export default app;