import express from "express";
const usersRouter = express.Router();

import { getAllUsersHandler, createAUserHandler, getAUserHandler } from "../controllers/user/user.controller.handler.js";


usersRouter.get("/", getAllUsersHandler);

usersRouter.post("/", createAUserHandler);

usersRouter.get("/:id", getAUserHandler);

export default usersRouter;
