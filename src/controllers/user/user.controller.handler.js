import bcrypt from "bcrypt";
import { getAllUsers, getAUser, createAUser } from "./user.controller.js";

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    throw new Error(error);
  }
};

const createAUserHandler = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = {
      username: username.replace(" ", ""),
      name: name,
      passwordHash: passwordHash,
    };
    await createAUser(user);
    res.status(201).json(user);
  } catch (error) {
    throw new Error(error);
  }
};

const getAUserHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getAUser(id);
    res.status(200).json(user).end();
  } catch (error) {
    throw new Error(error);
  }
};

export { getAllUsersHandler, createAUserHandler, getAUserHandler };
