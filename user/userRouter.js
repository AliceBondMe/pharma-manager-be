import express from "express";

import validateBody from "../middlewares/validateBody.js";
import userController from "./userController.js";
import { createUserSchema, loginUserSchema } from "./userSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(createUserSchema),
  userController.registerUser
);

userRouter.post(
  "/login",
  validateBody(loginUserSchema),
  userController.loginUser
);

userRouter.post("/logout", authenticate, userController.logoutUser);

userRouter.get("/user-info", authenticate, userController.refreshUser);

export default userRouter;
