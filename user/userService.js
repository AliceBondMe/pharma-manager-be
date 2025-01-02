import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./userModel.js";
import HttpError from "../helpers/HttpError.js";

const { SECRET_KEY } = process.env;

const registerUser = async ({ name, email, phone, password }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  newUser.token = token;
  newUser.password = undefined;

  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) throw HttpError(401, "Email or password is wrong");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  user.token = token;
  user.password = undefined;

  return user;
};

const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { token: "" });
};

export default {
  registerUser,
  loginUser,
  logoutUser,
};
