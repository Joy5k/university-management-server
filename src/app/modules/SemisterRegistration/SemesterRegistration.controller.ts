import httpStatus from "http-status";
import catchAsync from "../../utils/catchAync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./SemesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrieved successfully',
        data: result,
      });
})
const getAllSemesterRegistration=catchAsync(async(req,res)=>
{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrieved successfully',
        data: result,
      });
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const {id}=req.params
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrieved successfully',
        data: result,
      });
})
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await semesterRegistrationServices.updateSemesterRegistrationFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrieved successfully',
        data: result,
      });
 })
export const SemesterController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}