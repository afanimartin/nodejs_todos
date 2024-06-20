import express from "express";
import "express-async-errors"
import mongoose from "mongoose";
import cors from "cors";
import todosRouter from "./routes/todo.js";
import usersRouter from "./routes/user.js";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware.js";
import { info, error } from "./utils/logger.js";
import { config } from "./utils/config.js";

mongoose.set("strictQuery", false);

info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, { serverSelectionTimeoutMS: 15000 })
  .then(() => {
    console.log(`connected to ${config.MONGODB_URI}`);
  })
  .catch((err) => {
    error("error connecting to MongoDB:", err.message);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter)

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
