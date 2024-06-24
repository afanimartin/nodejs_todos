import express from "express";
import jwt from "jsonwebtoken";
import { isUserValid } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const doesUserExist = await isUserValid({
    username: username,
    password: password,
  });
  if (doesUserExist.isExist) {
    const userToken = {
      username: doesUserExist.user.username,
      id: doesUserExist.user.id,
    };

    const token = jwt.sign(userToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
    res.status(200).send({
      token: token,
      username: username,
      name: doesUserExist.user.name,
    });
  } else {
    res.status(401).send({ error: "invalid username or password" });
  }
});

export { authRouter };
