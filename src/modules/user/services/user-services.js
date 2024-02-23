import { userModel } from "../model/user-schema.js";
import {
  hashPassword,
  comparePassword,
} from "../../../shared/logger/authHelpers.js";
import JWT from "jsonwebtoken";
export const userServices = {
  async userRegisterService(data) {
    try {
      const { name, email, password, answer } = data;
      if (!name) return { status: false, message: "Name is required" };
      if (!email) return { status: false, message: "Email is required" };
      if (!password) return { status: false, message: "Password is required" };
      let user = await userModel.findOne({ email: email });
      console.log("User Data", user);
      if (user) return { status: false, message: "This Email already exists." };
      else {
        const hashedPassword = await hashPassword(password);
        const newUser = await userModel.create({
          name,
          email,
          password: hashedPassword,
          answer,
        });
        return {
          status: true,
          message: "Register successfully",
          data: newUser._id,
        };
      }
    } catch (err) {
      throw err;
    }
  },
  async userLoginService(data) {
    try {
      const { email, password } = data;
      if (!email) return { success: false, message: "Enter you Email" };
      if (!password) return { success: false, message: "Enter Your Password" };
      const user = await userModel.findOne({ email });
      if (!user) return { success: false, message: "User Not Found" };
      const match = await comparePassword(password, user.password);
      if (!match) return { success: false, message: "Password is incorrect" };
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return {
        success: true,
        message: "user login successfully",
        user: { name: user.name, email: user.email, id: user._id },
        token,
      };
    } catch (err) {
      throw err;
    }
  },
  async forgotPasswordServices(data) {
    try {
      const { email, answer, newPassword } = data;
      if (!email) return { success: false, message: "Enter email" };
      if (!answer) return { success: false, message: "Enter answer" };
      let user = await userModel.findOne({ email, answer });
      if (!user) return { success: false, message: "Invalid credentials" };
      const hashedPassword = await hashPassword(newPassword);
      const respnse = await userModel.findByIdAndUpdate(user._id, {
        password: hashedPassword,
      });
      return { success: true, message: "Password update successfully" };
    } catch (err) {
      throw err;
    }
  },
};
