import { trycatch } from "../helpers/trycatch.js";
import userService from "./userService.js";

const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const user = await userService.registerUser({ name, email, phone, password });

  res.status(201).json({ user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.loginUser({ email, password });

  res.status(200).json({ user });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  await userService.logoutUser(_id);

  res.status(200).json({
    message: "Logout success",
  });
};

const refreshUser = async (req, res) => {
  const { name, email, phone } = req.user;
  res.status(200).json({user: { name, email, phone }});
};

export default {
  registerUser: trycatch(registerUser),
  loginUser: trycatch(loginUser),
  logoutUser: trycatch(logoutUser),
  refreshUser: trycatch(refreshUser),
};
