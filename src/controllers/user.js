import User from "../models/user.js";

const getAllUsers = async () => {
  return await User.find({});
};

const createAUser = async (user) => {
  return await new User(user).save();
};

const getAUser = async (id) => {
  return await User.findById(id);
};

export { getAllUsers, getAUser, createAUser };
