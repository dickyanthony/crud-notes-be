const express = require("express");
const {
  getNotes,
  createNote,
  updateNoteById,
  deleteNote,
  getNoteById,
} = require("../../controllers/notes");
const app = express();

app.get("/note", getNotes);
app.get("/note/:id", getNoteById);
app.post("/note", createNote);
app.put("/note/:id", updateNoteById);
app.delete("/note/:id", deleteNote);

module.exports = app;
