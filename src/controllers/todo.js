import Todo from "../models/todo.js";
import { error } from "../utils/logger.js";

const createTodo = async (content) => {
  try {
    await new Todo(content).save();
  } catch (err) {
    error(err.message);
    throw Error(err.message);
  }
};

const getAllTodos = async () => {
  try {
    return await Todo.find({});
  } catch (err) {
    error(err.message);
    throw Error(err.message);
  }
};

const getTodo = async (id) => {
  try {
    const todo = await Todo.findById(id);
    if (todo) {
      return todo;
    } else {
      throw Error("todo not found.");
    }
  } catch (err) {
    error(err.message);
    throw Error(err.message);
  }
};

const updateTodo = async (todo) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todo.id, todo, {
      new: true,
      truerunValidators: true,
      context: "query",
    });
    if (!updatedTodo) {
      throw Error("todo not found.");
    }
    return updatedTodo;
  } catch (err) {
    error(err.message);
    throw Error(err.message);
  }
};

const deleteTodo = async (id) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      throw Error("todo not found.");
    }
  } catch (err) {
    error(err.message);
    throw Error(err.message);
  }
};

export { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
