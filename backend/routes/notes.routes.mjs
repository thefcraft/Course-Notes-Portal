import express from 'express';
import { getAllNotes, getNote, createNote, updateNote, deleteNote } from '../controllers/notes.controller.mjs';
import { verifyToken } from '../middleware/verifyToken.mjs';

const router = express.Router();

router.get('/', verifyToken, getAllNotes); // Fetch all notes with optional filters
router.get('/:note_id', verifyToken, getNote); // Fetch a specific note
router.post('/', verifyToken, createNote); // Upload a new note
router.put('/:note_id', verifyToken, updateNote); // Edit note metadata
router.delete('/:note_id', verifyToken, deleteNote); // Soft-delete the note

export default router;
