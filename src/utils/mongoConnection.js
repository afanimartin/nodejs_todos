import mongoose from "mongoose";
import { info, error } from "./logger.js";

const mongoConnection = async (uri) => {
  try {
    info(`Connecting to ${uri}`);
    await mongoose.connect(uri);
    info(`Connected to ${uri}`);
  } catch (err) {
    error(err.message);
  }
};

export default mongoConnection;
