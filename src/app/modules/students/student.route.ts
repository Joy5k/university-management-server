import express from 'express';
import { StudentController } from './student.controler';
const router = express.Router();

router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteSingleStudent);

export const StudentRoutes = router;
