import express from "express";
import {
  addNoteController,
  getAllNoteController,
  searchByTitleController,
  deleteNoteByIdController,
  updateNoteController,
  getSingleNoteController,
} from "../controllers/note-controller.js";
import { requireSignIn } from "../../../shared/middleware/authMiddleware.js";
const noteRouter = express.Router();

noteRouter.post("/add-note", requireSignIn, addNoteController);
noteRouter.get("/get-all-notes/:id", getAllNoteController);
noteRouter.delete("/delete-note/:id", requireSignIn, deleteNoteByIdController);
noteRouter.put("/update-note/:id", requireSignIn, updateNoteController);
noteRouter.get("/notes/search/:id", searchByTitleController);
noteRouter.get("/get-single-note/:id", getSingleNoteController);

export default noteRouter;
