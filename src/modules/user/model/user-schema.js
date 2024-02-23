import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  answer: { type: String, default: null },
  role: { type: Number, default: 0 },
});
export const userModel = mongoose.model("user", userSchema);
