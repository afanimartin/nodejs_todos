import { describe, test, expect } from "vitest";
import app from "../../app.js";
import { connect } from "../../utils/mongoSetup.js";
import request from "supertest";

describe("Todo Controller Tests", async () => {
  const uri = await connect();
  test("database connection", async () => {
    expect(uri).toBeDefined();
  });
  // test("GET /api/todos returns empty list", async () => {
  //   const response = await request(app).get("/api/todos");
  //   console.log(response.body)
  //   expect(response.status).toBe(200)
  //   expect(response.body.length).toBe(0);
  // });
  test("POST /api/todos creates a todo item", async () => {
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

  test("POST /api/post throws validation errors for missing values", async () => {
    let newUser = {
      username: "joeyy"
    }
    let response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(500);
  })
});
