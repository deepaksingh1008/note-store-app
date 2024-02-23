import { noteModel } from "../model/noteModel.js";

export const NoteServices = {
  async addNote(data) {
    try {
      const { title } = data;
      if (!title) return { success: false, message: "Title is required" };
      let noteExist = await noteModel.findOne({ title });
      if (noteExist)
        return { success: "false", message: "Note title already exits" };
      const newNote = await noteModel.create(data);
      return {
        success: true,
        message: "Note added Successfully",
        note: newNote,
      };
    } catch (err) {
      throw err;
    }
  },
  async getAllNote(id) {
    try {
      const notes = await noteModel.find({ userId: id });
      return { success: true, notes };
    } catch (error) {
      throw err;
    }
  },
  async deleteNote(id) {
    try {
      const note = await noteModel.findByIdAndDelete(id);
      if (!note) return { success: false, message: "No such note found" };
      else return { success: true, message: "Deleted successfully!" };
    } catch (err) {
      throw err;
    }
  },
  async updateNote(id, data) {
    //   console.log("updateNote service : ", id);
    try {
      const updatedData = await noteModel.findByIdAndUpdate(id, {
        $set: { ...data, isUpdated: true },
      });
      return { success: true, message: "Note has been Updated.", updatedData };
    } catch (error) {
      throw err;
    }
  },
  async searchNote(title, id) {
    try {
      const searchCriteria = {
        $and: [{ title: new RegExp(title, "i") }, { userId: id }],
      };
      const notes = await noteModel.find(searchCriteria);
      return { success: true, notes };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async getSingleNote(id) {
    try {
      const note = await noteModel.findById({ _id: id });
      return { success: true, singleNote: note };
    } catch (err) {
      throw err;
    }
  },
};
