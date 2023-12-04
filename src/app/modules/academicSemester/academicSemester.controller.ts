import { NextFunction, Request, Response } from 'express';
// import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../utils/catchAync';

const createAcademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //   const { password, student: StudentData } = req.body;

    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
      req.body,
    );

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
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  getAllAcademicSemesters,
};
