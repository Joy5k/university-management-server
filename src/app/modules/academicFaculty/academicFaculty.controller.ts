
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAync';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //   const { password, student: StudentData } = req.body;

      const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllAcademicFaculties = catchAsync(async (req, res,next) => {
  try {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
  } catch (error) {
    next(error)
  }
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is updated succesfully',
      data: result,
    });
});


export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
  getSingleAcademicFaculty
  
};
