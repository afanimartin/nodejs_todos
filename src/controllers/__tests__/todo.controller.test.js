import { describe, test, expect } from "vitest";
import { connect } from "../../utils/mongoSetup.js";

import {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../todo/todo.controller.js";

describe("Todo Controller Tests", async () => {
  const uri = await connect()
  test("database connection", async () => {
    expect(uri).toBeDefined()
  })
  test("empty todos collection", async () => {
    const todos = await getAllTodos();
    expect(todos.length).toBe(0);
  });
  test("validation error for missing user", async () => {
    const newTodo = {
      content: "getting started"
    }
    await expect(createTodo(newTodo)).rejects.toThrow(
      /Todo validation failed: user: Path `user` is required./
    );
  })
});
