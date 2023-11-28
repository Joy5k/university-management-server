import { AcademicSemesterController } from './academicSemester.controller';
import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();
router.post(
  '/create-academic-semesters',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoute = router;
