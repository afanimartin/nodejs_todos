import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import supertest from "supertest";
import { connect, disconnect } from "../../utils/mongoSetup.js";

import app from "../../app.js";
import { Todo } from "../../models/todo.js";

const api = supertest(app);

beforeAll(async () => connect());
afterAll(async () => await disconnect());

describe("todos routes", () => {
  test("response type is json", async () => {
    await api
      .get("/api/todos")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("return 1 as number of todos saved", async () => {
    await Todo({
      content: "getting started",
      user: "6673efa51c870a835309c44c",
    }).save();
    const response = await api.get("/api/todos");
    expect(response.body.length).toBe(1);
  });

  test("first todo is about getting started", async () => {
    const response = await api.get("/api/todos");
    const contents = response.body.map((e) => e.content);
    expect(contents[0]).toBe("getting started");
  });
});
