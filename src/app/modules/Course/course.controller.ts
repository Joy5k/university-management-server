import httpStatus from "http-status";
import catchAsync from "../../utils/catchAync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is created successfully",
        data:result
    })
})
const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query)
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success: true,
        message: "Get All courses successfully",
        data:result
    })
})
const getSingleCourse = catchAsync(async (req, res) => {
    const  {id}  = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success: true,
        message: "Get Single course successfully",
        data:result
    })
})
const deleteCourse = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await CourseServices.deleteCourseIntoDB(id);
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success: true,
        message: "Delete course successfully",
        data:result
    })
})
export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse
}