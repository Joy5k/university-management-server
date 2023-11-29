import express from 'express';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validationRequest';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.CreateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;