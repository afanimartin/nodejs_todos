import mongoConnection from "../../utils/mongoConnection.js";
import config from "../../utils/config.js";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "./todo.controller.js";

const createTodo = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    const newTodo = {
      content: req.body.content,
      user: req.body.user,
    };
    await createTodo(newTodo);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllTodos = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    const todos = await getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    throw new Error(error);
  }
};

const getTodo = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    throw new Error(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    const updatedTodo = await updateTodo(req.body);
    res.status(200).json(updatedTodo);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    await mongoConnection(config.MONGODB_URI);
    await deleteTodo(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (error) {
    throw new Error(error);
  }
};

export { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
