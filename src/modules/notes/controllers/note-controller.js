import { NoteServices } from "../services/note-services.js";
//create note
export const addNoteController = async (req, res) => {
  try {
    const response = await NoteServices.addNote(req.body);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in adding Notes", error });
  }
};
//get all notes
export const getAllNoteController = async (req, res) => {
  try {
    const response = await NoteServices.getAllNote(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "error in get all note api" });
  }
};

//delete notes
export const deleteNoteByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await NoteServices.deleteNote(id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "error in delete note api" });
  }
};

//update note
export const updateNoteController = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const response = await NoteServices.updateNote(id, data);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "error in update note api" });
  }
};

//searching
export const searchByTitleController = async (req, res) => {
  //console.log(req.query);
  console.log(req.params.id);
  const title = req.query.title;
  try {
    const response = await NoteServices.searchNote(title, req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "error in searching note api" });
  }
};

//get single note
export const getSingleNoteController = async (req, res) => {
  // const { id } = req.params;
  console.log(req.params.id);
  try {
    const response = await NoteServices.getSingleNote(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error In Fetching Single Note!" });
  }
};
