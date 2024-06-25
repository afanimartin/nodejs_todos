import express from "express";
import { createTodoHandler, getAllTodosHandler, getTodoHandler, updateTodoHandler, deleteTodoHandler } from "../controllers/todo/todo.controller.handler.js"

const todosRouter = express.Router();

todosRouter.post("/", createTodoHandler);

todosRouter.get("/", getTodoHandler);

todosRouter.get("/:id", getAllTodosHandler);

todosRouter.put("/:id", updateTodoHandler);

todosRouter.delete("/:id", deleteTodoHandler);

export default todosRouter;
