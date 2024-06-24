import bcrypt from "bcrypt";
import { User } from "../models/user.js";

const isUserValid = async (authUser) => {
  const user = await User.findOne({ username: authUser.username });
  const isPasswordCorrect =
    user === null
      ? false
      : await bcrypt.compare(authUser.password, user.passwordHash);

  return { user: user, isExist: isPasswordCorrect };
};

export { isUserValid };
