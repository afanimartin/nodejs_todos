import mongoConnection from "../../utils/mongoConnection.js";
import { Todo } from "../../models/todo.model.js";
import config from "../../utils/config.js";

const createTodo = async (todo) => {
    await mongoConnection(config.MONGODB_URI);
    await Todo(todo).save();
};

const getAllTodos = async () => {
  await mongoConnection(config.MONGODB_URI);
  return Todo.find({}).populate("user", { username: 1, name: 1 });
};

const getTodo = async (id) => {
  await mongoConnection(config.MONGODB_URI);
  return await Todo.findById(id);
};

const updateTodo = async (todo) => {
  await mongoConnection(config.MONGODB_URI);
  const updatedTodo = await Todo.findByIdAndUpdate(todo.id, todo, {
    new: true,
    truerunValidators: true,
    context: "query",
  });
  return updatedTodo;
};

const deleteTodo = async (id) => {
  await mongoConnection(config.MONGODB_URI);
  await Todo.findByIdAndDelete(id);
};

export { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
