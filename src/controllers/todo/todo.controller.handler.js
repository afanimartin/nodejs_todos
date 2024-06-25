import jwt from "jsonwebtoken";
import mongoConnection from "../../utils/mongoConnection.js";
import config from "../../utils/config.js";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "./todo.controller.js";

const getTokenFromRequest = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  } else {
    return null;
  }
};

const createTodoHandler = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    const decodedToken = jwt.verify(
      getTokenFromRequest(req, process.env.SECRET)
    );
    if (decodedToken.id) {
      const newTodo = {
        content: req.body.content,
        user: req.body.user
      }
      await createTodo(newTodo);
      res.status(200).json({ status: "success" });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getAllTodosHandler = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    const todos = await getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    throw new Error(error);
  }
};

const getTodoHandler = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    const todo = await getTodo()
    res.status(200).json(todo);
  } catch (error) {
    throw new Error(error);
  }
};

const updateTodoHandler = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    const updatedTodo = await updateTodo(req.body);
    res.status(200).json(updatedTodo);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    await deleteTodo(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (error) {
    throw new Error(error);
  }
};

export {
  createTodoHandler,
  getAllTodosHandler,
  getTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
};
