import express from 'express';
import cookieParser from 'cookie-parser';
import { addCourse, deleteCourse, deleteNotes, getAllCourses, getCourse, enrollCourse, unenrollCourse, getNoteById, upload } from '../controllers/content.controller.mjs';
import { verifyToken } from '../middleware/verifyToken.mjs';
import { authorizeRole } from '../middleware/authorizeRoles.mjs';

const contentRoute = express.Router();

contentRoute.use(express.json()); 
contentRoute.use(cookieParser()); 

contentRoute.post('/add-course',verifyToken,authorizeRole("cr") ,addCourse);
contentRoute.post('/upload',verifyToken,authorizeRole("cr"), upload);
contentRoute.get('/course/:courseId/view/:id',verifyToken, getNoteById);
contentRoute.get('/course/:id',verifyToken, getCourse);
contentRoute.post('/course/enroll',verifyToken, enrollCourse);
contentRoute.post('/course/unenroll',verifyToken, unenrollCourse);
contentRoute.get('/all-courses',verifyToken, getAllCourses);
contentRoute.delete('/delete-course/:id',verifyToken,authorizeRole("cr"), deleteCourse);
contentRoute.delete('/delete-note/:id',verifyToken,authorizeRole("cr"), deleteNotes);


export default contentRoute