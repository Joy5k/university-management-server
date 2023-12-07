import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { courseSearchAbleFields } from "./course.constant"
import { TCourse } from "./course.interface"
import { Course } from "./course.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"

const createCourseIntoDB = async (payload:TCourse) => {
    const result = await Course.create(payload)
    return result
}
const getAllCoursesFromDB = async (query:Record<string,unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query).search(courseSearchAbleFields)
        .filter().sort()
        .paginate()
        .fields()
    const result = await courseQuery.modelQuery
    return result
}
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result
}
const deleteCourseIntoDB = async (id: string) => {
    const result=await Course.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return result
}
const updateCourseIntoDB = async (id: string, payload:Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;
    const session = await mongoose.startSession()
    try {
        session.startTransaction()



        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, {
            new: true,
            runValidators: true,
            session
        })
        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic course info")
        }
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletePreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course)
            const deletePreRequisitesCourse = await Course.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourses: { course: { $in: deletePreRequisites } } }
            }, { new: true, runValidators: true, session })
            if (!deletePreRequisitesCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic course info")
            }
            const newRequisite = preRequisiteCourses.filter(el => el.course && !el.isDeleted)
            const newPreRequisite = await Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newRequisite } }
            }, { new: true, runValidators: true, session })
            if (!newPreRequisite) {
                throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic course info")
            }
            const updatedResult = await Course.findById(id).populate('preRequisiteCourses.course')
            return updatedResult
        }
        await session.commitTransaction()
        await session.endSession()
    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic course info")
    }
}
export const CourseServices = {
 createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseIntoDB,
    updateCourseIntoDB
}