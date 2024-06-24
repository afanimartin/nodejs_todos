import { User } from "../models/user.js";

const getAllUsers = async () => {
  return await User.find({}).populate("todos", { content: 1, isComplete: 1 });
};

const createAUser = async (user) => {
  return await new User(user).save();
};

const getAUser = async (id) => {
  return await User.findById(id);
};

export { getAllUsers, getAUser, createAUser };
