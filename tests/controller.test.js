import Todo from "../src/models/todo.js";
// import { connect, disconnect } from "../src/utils/database.js";
import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../src/controllers/Todo.js";

// beforeAll(async () => connect());

describe("test the todo model", () => {
  test("test ability to create a todo item", async () => {
    const response = await createTodo({ content: "getting started" });
    expect(response.status).toBe(200);
  });
});

// afterAll(async () => disconnect());
