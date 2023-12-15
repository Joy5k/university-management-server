import httpStatus from "http-status";
import catchAsync from "../../utils/catchAync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./SemesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is created successfully',
        data: result,
      });
})
const getAllSemesterRegistration=catchAsync(async(req,res)=>
{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration retrieved successfully',
        data: result,
      });
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const {id}=req.params
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration retrieved successfully',
        data: result,
      });
})
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await semesterRegistrationServices.updateSemesterRegistrationFromDB(id,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registered update successfully',
        data: result,
      });
 })
export const SemesterController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}