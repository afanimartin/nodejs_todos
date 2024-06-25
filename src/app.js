import express from "express";
import "express-async-errors";
import cors from "cors";
import todosRouter from "./routes/todo.routes.js";
import usersRouter from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter)

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
