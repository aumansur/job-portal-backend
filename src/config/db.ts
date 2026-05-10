import mongoose from "mongoose";
import config from ".";

export const connectDB = async () => {
  await mongoose.connect(config.db_url as string);
  console.log("DB Connected");
};
