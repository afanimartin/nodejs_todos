import express from "express";
import bcrypt from "bcrypt";
const usersRouter = express.Router();

import { getAllUsers, createAUser, getAUser } from "../controllers/user.js";


usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users).end();
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = {
    username: username.replace(" ", ""),
    name: name,
    passwordHash: passwordHash,
  };
  const newUser = await createAUser(user);
  res.status(201).send(newUser).end();
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getAUser(id);
  if (user) {
    res.status(200).send(user).end();
  } else {
    res.status(404).send({ error: "user with id not found" });
  }
});

export default usersRouter;
