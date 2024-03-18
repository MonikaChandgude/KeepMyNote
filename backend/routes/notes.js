const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 -----Get all notes: GET "/api/notes/getuser - Login required".
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
});

//Route 2 -----Add New Notes: POST "/api/notes/addnotes - Login required".
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
   
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("An error occurred");
    }
  }
);

//Route 3 -----Update Notes: PUT "/api/notes/updatenote - Login required".
router.put(
  "/updatenotes/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;

    try {
      //Create new Object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //Find the note to be updated and update
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("not allowd");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowd");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("An error occurred");
    }
  }
);

//Route 4 ----Delete Notes: DELETE "/api/notes/deletenote - Login required".
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //Create new Object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    //Allow deletion only if user owns this notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowd");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
});
module.exports = router;
