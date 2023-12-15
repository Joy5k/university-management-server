import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { TSemesterRegistration } from "./SemesterRegistration.interface"
import { semesterRegistration } from "./SemesterRegistration.model"

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester
   
    const isExistsAcademicSemester = await AcademicSemester.findById(academicSemester)
    if (!isExistsAcademicSemester) { 
        throw new AppError(httpStatus.NOT_FOUND,"The Academic Semester not found")
    }
   
   
    const isSemesterRegistrationExist = await semesterRegistration.findOne({ academicSemester })
    if (isSemesterRegistrationExist) {
        throw new AppError(httpStatus.CONFLICT,"The semester already exists")
    }

    const result = await semesterRegistration.create(payload)
    return result
  
 }

const getAllSemesterRegistrationFromDB = async () => { }


const getSingleSemesterRegistrationFromDB = async (id:string) => {
    
 }

const updateSemesterRegistrationFromDB = async () => { }

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationFromDB
}