import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const todosRouter = express.Router();

todosRouter.post("/", async (req, res) => {
  try {
    await createTodo(req.body);
    res.status(201).end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

todosRouter.get("/", async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.status(200).send(todos).end();
  } catch (err) {
    res.status(400).send({ error: err.message }).end();
  }
});

todosRouter.get("/:id", async (req, res) => {
  try {
    const foundTodo = await getTodo(req.params.id);
    res.status(200).send(foundTodo).end();
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

todosRouter.put("/:id", async (req, res) => {
  try {
    const requestBody = req.body;
    const todoId = req.params.id;

    const updatedTodo = {
      id: todoId,
      content: requestBody.content,
      isComplete: requestBody.isComplete,
    };
    await updateTodo(updatedTodo);
    res.status(200).send(updatedTodo).end();
  } catch (err) {
    res.status(500).send({ error: err.message }).end();
  }
});

todosRouter.delete("/:id", async (req, res) => {
  try {
    await deleteTodo(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).send({ error: err.message }).end();
  }
});

export default todosRouter;
