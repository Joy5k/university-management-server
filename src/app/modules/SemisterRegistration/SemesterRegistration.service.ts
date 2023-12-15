import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { TSemesterRegistration } from "./SemesterRegistration.interface"
import { semesterRegistration } from "./SemesterRegistration.model"
import QueryBuilder from "../../builder/QueryBuilder"
import { RegistrationStatus } from "./SemesterRegistration.constance"

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester
    //checking any semester ongoing or upcoming is or not
    const isThereAnyUpcomingOrOngoingSemester = await semesterRegistration.findOne({
        $or: [{
            status:"UPCOMING",
        },{status:"ONGOING",}]
    })
    if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(httpStatus.BAD_REQUEST,`There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`)
}

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

const getAllSemesterRegistrationFromDB = async (query:Record<string,unknown>) => { 

    const semesterRegistrationQuery = new QueryBuilder(semesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields()
    const result = semesterRegistrationQuery.modelQuery
    return result
}


const getSingleSemesterRegistrationFromDB = async (id:string) => {
    const result = await semesterRegistration.findById(id)
    return result
 }

const updateSemesterRegistrationFromDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
    // check the if the requested semester is exists
    const isSemesterRegistrationExist = await semesterRegistration.findById(id)
    if (!isSemesterRegistrationExist) {
        throw new AppError(httpStatus.NOT_FOUND, "The  Semester not found")
    }
 
 
    // if the request semester registration is ended ,we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExist?.status
    const requestStatus=payload?.status
    if (currentSemesterStatus===RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST,`The semester already ${currentSemesterStatus}`)
    }
    if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST,`You can't change status fro, ${currentSemesterStatus} to ${requestStatus}`)
    }
    if (currentSemesterStatus ===RegistrationStatus.ONGOING && requestStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST,`You can't change status fro, ${currentSemesterStatus} to ${requestStatus}`)
    }
    const result = await semesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators:true
    })
    return result
}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationFromDB
}