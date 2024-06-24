import { describe, beforeAll, afterEach, afterAll, test, expect } from "vitest";
import { connect, disconnect } from "../../utils/mongoSetup.js";

import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../todo.js";

beforeAll(async () => connect());
afterAll(async () => await disconnect());

describe("todo model tests", () => {
  test("empty todos collection", async () => {
    const todos = await getAllTodos();
    expect(todos.length).toBe(0);
  }, 50000);
});
