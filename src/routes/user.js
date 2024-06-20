import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const usersRouter = express.Router();

import { getAllUsers, createAUser, getAUser } from "../controllers/user.js";
import { isUserValid } from "../controllers/auth.js";

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

usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const doesUserExist = await isUserValid({
    username: username,
    password: password,
  });
  if (doesUserExist.isExist) {
    const userToken = {
      username: username,
      id: doesUserExist.id,
    };

    const token = jwt.sign(userToken, process.env.SECRET);
    res.status(200).send({ token: token, username: username, name: doesUserExist.user.name });
  } else {
    res.status(401).send({ error: "invalid username or password" });
  }
});

export default usersRouter;
