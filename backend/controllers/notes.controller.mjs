import Note from '../models/Note.model.mjs';
export const getAllNotes = async (req, res) => {
    try {
      const filters = req.query;
      const notes = await Note.find(filters); // Add filtering logic
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export const getNote = async (req, res) => {
    try {
      const note = await Note.findById(req.params.note_id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export const createNote = async (req, res) => {
    try {
      const newNote = new Note({ ...req.body, user: req.user.id });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export const updateNote = async (req, res) => {
    try {
      const updatedNote = await Note.findByIdAndUpdate(req.params.note_id, req.body, { new: true });
      if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export const deleteNote = async (req, res) => {
    try {
      const note = await Note.findById(req.params.note_id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      note.isDeleted = true; // Soft delete
      await note.save();
      res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  