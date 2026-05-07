
import express from "express";
import cors from "cors";

import { globalErrorHandler } from "./middlewares/errorHandler";
import router from "./routes";


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1", router);
app.use(globalErrorHandler)

export default app;


