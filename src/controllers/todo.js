import Todo from "../models/todo.js";

const createTodo = async (content) => {
  await new Todo(content).save();
};

const getAllTodos = async () => {
  return await Todo.find({});
};

const getTodo = async (id) => {
  const todo = await Todo.findById(id);
  if (todo) {
    return todo;
  }
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
