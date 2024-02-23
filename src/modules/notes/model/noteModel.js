import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  date: { type: String, default: Date.now() },
  color: { type: String, default: "#ff1245" },
  userId: { type: String },
});

export const noteModel = mongoose.model("Notes", noteSchema);
