import mongoose from "mongoose";
import { info } from "./logger.js";
import config from "./config.js";

const connect = () => {
  console.log(`connecting to ${config.MONGODB_URI}`)
  mongoose.createConnection(config.MONGODB_URI);
  info(`connected to ${config.MONGODB_URI}`)
};

const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export { connect, disconnect };
