import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { semesterRegistration } from './SemesterRegistration.validation';
import { SemesterController } from './SemesterRegistration.controller';


const router = express.Router();

router.post('/create-semester-registration', validateRequest(semesterRegistration.createSemesterRegistrationValidation), SemesterController.createSemesterRegistration)
router.get('/', SemesterController.getAllSemesterRegistration)
router.get('/:id', SemesterController.getSingleSemesterRegistration)
router.patch('/:id',validateRequest(semesterRegistration.updateSemesterRegistrationValidation), SemesterController.updateSemesterRegistration)

export const semesterRegistrationRouter=router