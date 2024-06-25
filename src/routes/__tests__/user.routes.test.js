import { describe, test, expect } from "vitest";
import request from "supertest";
import { connect } from "../../utils/mongoSetup.js";
import app from "../../app.js";

describe("User API Tests", async () => {
  const uri = await connect();
  test("should connect to database", async () => {
    expect(uri).toBeDefined();
  });
  test("POST /api/users should create new User", async () => {
    const newUser = {
      username: "joeyy",
      name: "joey kenzie",
      password: "123456",
    };

    const response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(201);

    // Test returned User
    const user = response.body
    expect(user).toHaveProperty("name", newUser.name)
    expect(user).toHaveProperty("username", newUser.username.replace(" ", ""))
  });
});
