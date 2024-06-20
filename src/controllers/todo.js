import Todo from "../models/todo.js";

const createTodo = async (content) => {
  return await new Todo(content).save();
};

const getAllTodos = async () => {
  return await Todo.find({}).populate("user", { username: 1, name: 1 });
};

const getTodo = async (id) => {
  return await Todo.findById(id);
};

const updateTodo = async (todo) => {
  const updatedTodo = await Todo.findByIdAndUpdate(todo.id, todo, {
    new: true,
    truerunValidators: true,
    context: "query",
  });
  return updatedTodo;
};

const deleteTodo = async (id) => {
  await Todo.findByIdAndDelete(id);
};

export { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
