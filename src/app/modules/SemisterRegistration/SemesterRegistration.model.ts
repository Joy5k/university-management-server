import mongoose, { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./SemesterRegistration.interface";
import { SemesterRegistrationStatus } from "./SemesterRegistration.constance";


const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester",
        unique: true,
        required:true
    },
    status: {
        type: String,
        enum: SemesterRegistrationStatus,
        default:'UPCOMING'
    },
    startDate: {
        type: Date,required:true,
    },
    endDate: {
        type: Date,required:true,
    },
    minCredit: {
        type: Number,default:3
    },
    maxCredit: {
        type: Number,default:15
    }
}, {
    timestamps:true
})

export const semesterRegistration=model<TSemesterRegistration>("SemesterRegistration",semesterRegistrationSchema)