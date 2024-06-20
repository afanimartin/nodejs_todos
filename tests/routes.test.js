import { test, describe, beforeEach, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app.js";
import Todo from "../src/models/todo.js";

const api = supertest(app);

beforeEach(async () => {
  await Todo.deleteMany({});
  let todoObject = new Todo({
    content: "getting started with testing in nodejs",
  });
  await todoObject.save();
});

test("response type is json", async () => {
  await api
    .get("/api/todos")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("return 1 as number of todos saved", async () => {
  const response = await api.get("/api/todos");
  assert(response.body.length, 1);
});

test("first todo is about getting started with testing in nodejs", async () => {
  const response = await api.get("/api/todos");
  const contents = response.body.map((e) => e.content);
  assert(contents[0].includes("getting started with testing in nodejs"), true);
});

after(async () => {
  await mongoose.connection.close();
});
