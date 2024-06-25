import { User } from "../../models/user.model.js";
import mongoConnection from "../../utils/mongoConnection.js";
import config from "../../utils/config.js";

const getAllUsers = async () => {
  await mongoConnection(config.MONGODB_URI);
  return await User.find({}).populate("todos", { content: 1, isComplete: 1 });
};

const createAUser = async (user) => {
  await mongoConnection(config.MONGODB_URI);
  return await User(user).save();
};

const getAUser = async (id) => {
  await mongoConnection(config.MONGODB_URI);
  return await User.findById(id);
};

export { getAllUsers, getAUser, createAUser };
