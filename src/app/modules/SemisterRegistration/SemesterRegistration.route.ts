import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { semesterRegistration } from './SemesterRegistration.validation';
import { SemesterController } from './SemesterRegistration.controller';


const router = express.Router();

router.post('/create-semester-registration', validateRequest(semesterRegistration.createSemesterRegistrationValidation), SemesterController.createSemesterRegistration)

export const semesterRegistrationRouter=router