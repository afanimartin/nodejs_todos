import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";
import { getAUser } from "../controllers/user.js";

const todosRouter = express.Router();

todosRouter.post("/", async (req, res) => {
  const user = await getAUser(req.body.user);
  const newTodo = await createTodo(req.body);
  user.todos = user.todos.concat(newTodo._id);
  await user.save();
  const todos = await getAllTodos();
  res.status(201).send(todos);
});

todosRouter.get("/", async (req, res) => {
  const todos = await getAllTodos();
  res.status(200).send(todos).end();
});

todosRouter.get("/:id", async (req, res) => {
  const foundTodo = await getTodo(req.params.id);
  if (foundTodo) {
    res.status(200).send(foundTodo).end();
  } else {
    res.status(404).send({ error: "todo with id not found" });
  }
});

todosRouter.put("/:id", async (req, res) => {
  const requestBody = req.body;
  const todoId = req.params.id;

  const updatedTodo = {
    id: todoId,
    content: requestBody.content,
    isComplete: requestBody.isComplete,
  };
  await updateTodo(updatedTodo);
  res.status(200).send(updatedTodo).end();
});

todosRouter.delete("/:id", async (req, res) => {
  await deleteTodo(req.params.id);
  res.status(204).end();
});

export default todosRouter;
