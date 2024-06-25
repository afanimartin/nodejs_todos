import express from "express";
import jwt from "jsonwebtoken";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo/todo.controller.js";
import { getAUser } from "../controllers/user/user.controller.js";

const todosRouter = express.Router();

const getTokenFromRequest = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  } else {
    return null;
  }
}

todosRouter.post("/", async (req, res) => {
  const decodedToken = jwt.verify(getTokenFromRequest(req), process.env.SECRET);
  if (!decodedToken.id) {
    res.status(401).send({ error: "invalid access token" });
  }
  const user = await getAUser(decodedToken.id);
  if (user) {
    const newTodo = await createTodo({ content: req.body.content, user: user });
    user.todos = user.todos.concat(newTodo._id);
    await user.save();
    res.status(201).send({ message: "todo created successfully" });
  } else {
    res.status(404).end();
  }
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
