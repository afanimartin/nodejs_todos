import { describe, test, expect } from "vitest";
import app from "../../app.js";
import { connect } from "../../utils/mongoSetup.js";
import request from "supertest";

describe("Todo Controller Tests", async () => {
  const uri = await connect();
  test("database connection", async () => {
    expect(uri).toBeDefined();
  });
  test("empty todos collection", async () => {
    const response = await request(app).get("/api/todos");
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(0);
  });
  // test("validation error for missing user", async () => {
  //   const newTodo = {
  //     content: "getting started",
  //   };
  //   await expect(createTodo(newTodo)).rejects.toThrow(
  //     /Todo validation failed: user: Path `user` is required./
  //   );
  // });
  test("creation of todo item", async () => {
    const newUser = {
      username: "joeyy",
      name: "joey kenzie",
      password: "123456",
    };

    const response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(201);

    const user = response.body;
    const newTodo = {
      content: "getting started",
      user: user.id,
    };
    await request(app).post("/api/todos").send(newTodo);
  });

  test("validation errors for missing values", async () => {
    let newUser = {
      username: "joeyy"
    }
    let response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(500);
  })
});
