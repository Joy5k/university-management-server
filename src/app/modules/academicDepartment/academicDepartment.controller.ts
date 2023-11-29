
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAync';
import { AcademicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //   const { password, student: StudentData } = req.body;

      const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllAcademicDepartment= catchAsync(async (req, res,next) => {
  try {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
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

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const  {departmentId}  = req.params;
  const result =await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is updated succesfully',
      data: result,
    });
});

const deleteAcademicDepartment =catchAsync(  async (
    req,
    res,
  ) => {
      const id = req.params.id;
      const result = await AcademicDepartmentServices.deleteAcademicDepartmentFromDB(id);
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'The academic department was successfully deleted',
        data: result,
      });
    } 
  )
  
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
    getSingleAcademicDepartment,
    deleteAcademicDepartment
  
};
