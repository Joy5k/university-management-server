import { NextFunction, Request, Response } from 'express';
// import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //   const { password, student: StudentData } = req.body;

      const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const AcademicSemesterController = {
   createAcademicSemester,
};
