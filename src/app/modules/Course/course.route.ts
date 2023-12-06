import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.get('/:id', CourseController.getSingleCourse);

// router.patch(
//   '/:id',
//   validateRequest(updateFacultyValidationSchema),
//   CourseController.updateFaculty,
// );

router.delete('/:id', CourseController.deleteCourse);

router.get('/', CourseController.getAllCourses);

export const CoursesRoutes = router;
