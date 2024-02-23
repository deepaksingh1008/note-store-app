import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controllers/userControllers.js";
const userRoutes = express.Router();

userRoutes.post("/register", registerController);
userRoutes.post("/login", loginController);
userRoutes.post("/forgot-password", forgotPasswordController);
export default userRoutes;
