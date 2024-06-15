const query = require("../database");

const getNotes = async (req, res) => {
  try {
    const data = await query(`SELECT * FROM notes`);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
const getNoteById = async (req, res) => {
  const id = req.params.id;
  try {
    const [data] = await query(`SELECT * FROM notes where id=?`, [id]);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createNote = async (req, res) => {
  const { title, datetime, note } = req.body;

  try {
    //  prevent SQL injection
    const { noteId: id } = await query(
      `
        INSERT INTO notes (
          title, datetime, note
        ) VALUES (
          ?, ?, ?
        );
      `,
      [title, datetime, note]
    );

    return res.status(200).json({
      message: "Note added success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateNoteById = async (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;

  try {
    const result = await query(
      `
      UPDATE notes
      SET
        title  = COALESCE(?, title),
        datetime = COALESCE(?, datetime),
        note = COALESCE(?,note)
      WHERE
      id = ?;
      `,
      [title, datetime, note, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `Update Note with id ${id} failed`,
      });
    }
    return res.status(200).json({
      message: "Update data success",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// BAGIAN DALAM RESULT QUERY ERROR //
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      `
      DELETE FROM notes
       WHERE
       id = ?;
      `,
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Delete Note is Not found!!",
      });
    }
    return res.status(200).json({
      message: "Deleted Note is Success",
      data: {
        id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNoteById,
  deleteNote,
};
