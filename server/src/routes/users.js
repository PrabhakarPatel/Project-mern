import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";

const app = express.Router();

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  if (user) {
    return res.json({
      message: "User already registered",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    password: hashedPassword,
  });
  res.status(201).json({
    newUser,
    message: "User registrated successfully",
  });
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.json({
      message: "User does not exist",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({
      message: "usernames and passwords is incorrect",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    "secretKey"
  );
  res.json({
    token,
    userID: user._id,
  });
});

export default app;

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secretKey", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
