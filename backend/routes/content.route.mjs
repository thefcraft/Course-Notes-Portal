import express from 'express';
import cookieParser from 'cookie-parser';
import { addCourse, deleteCourse, deleteNotes, getAllCourses, getCourse, getNoteById, upload } from '../controllers/content.controller.mjs';

const contentRoute = express.Router();

contentRoute.use(express.json()); 
contentRoute.use(cookieParser()); 

contentRoute.post('/add-course', addCourse);
contentRoute.post('/upload', upload);
contentRoute.get('/view/:id', getNoteById);
contentRoute.get('/course/:id', getCourse);
contentRoute.get('/all-courses', getAllCourses);
contentRoute.delete('/delete-course/:id', deleteCourse);
contentRoute.delete('/delete-note/:id', deleteNotes);


export default contentRoute