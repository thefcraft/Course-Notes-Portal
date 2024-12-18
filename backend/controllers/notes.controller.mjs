import Note from '../models/Note.model.mjs';
export const getAllNotes = async (req, res) => {
    try {
      const filters = { ...req.query, isDeleted: false }; // Combine the filters with isDeleted: false
      const notes = await Note.find(filters); // TODO: Add filtering logic
      res.status(200).json({success: true, notes});
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  };
  
  export const getNote = async (req, res) => {
    try {
      const note = await Note.findById(req.params.note_id);
      if (!note || note.isDeleted) return res.status(404).json({ success: false, message: 'Note not found' });
      res.status(200).json({success: true, note});
    } catch (error) {
      res.status(500).json({success: false, message: 'Server error', error });
    }
  };
  
  export const createNote = async (req, res) => {
    const {title, content} = req.body;
    try {
      const noteAlreadyExists = await Note.findOne({ title }) // title is unique...
      if(noteAlreadyExists){
        if(noteAlreadyExists.isDeleted){
          noteAlreadyExists.isDeleted = false;
          noteAlreadyExists.content = content;
          await noteAlreadyExists.save();
          return res.status(201).json({success: true, note: noteAlreadyExists});
        }
        return res.status(400).json({success: false, message: "Note already exists"});
      }
      const newNote = new Note({ ...req.body, user: req.userId });
      await newNote.save();
      res.status(201).json({success: true, note: newNote});
    } catch (error) {
      res.status(500).json({success: false, message: 'Server error', error });
    }
  };
  
  export const updateNote = async (req, res) => {
    try {
      const updatedNote = await Note.findByIdAndUpdate(req.params.note_id, req.body, { new: true });
      if (!updatedNote || updatedNote.isDeleted) return res.status(404).json({success: false, message: 'Note not found' });
      res.status(200).json({success: true, note: updatedNote});
    } catch (error) {
      res.status(500).json({success: false, message: 'Server error', error });
    }
  };
  
  export const deleteNote = async (req, res) => {
    try {
      const note = await Note.findById(req.params.note_id);
      if (!note || note.isDeleted) return res.status(404).json({success: false, message: 'Note not found' });
      note.isDeleted = true; // Soft delete
      await note.save();
      res.status(200).json({success: true, message: 'Note deleted' });
    } catch (error) {
      res.status(500).json({success: false, message: 'Server error', error });
    }
  };
  