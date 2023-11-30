import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: "string", required: true,unique: true },
    academicFaculty: {
        type: Schema.Types.ObjectId,
    ref:"AcademicFaculty"}
}, {
    timestamps:true
})
academicDepartmentSchema.pre('save', async function (next) {
    //নিচে findOne মেথট টি name  এর উপর কুয়েরি করে find করা হচ্ছে। এবং this.name দিয়ে বর্তমান কুয়েরি থেকে নাম নিয়ে সেই নাম ব্যবহার করে ডাটাবেজে চেক করা হচ্ছে।এই নামে কোন department already  তৈরি করা হয়েছে কিনা
    const isDepartmentExist = await AcademicDepartment.findOne({ name: this.name })
   console.log(isDepartmentExist);
    if (isDepartmentExist) {
        throw new Error("The Department already exists")
    }
    next()
})
academicDepartmentSchema.pre("findOneAndUpdate",async function (next) {
    const query = this.getQuery();
    console.log(query);
    const isDepartmentExist = await AcademicDepartment.findOne(query)
    if (!isDepartmentExist) {
        throw new Error("The Department does not exist")
    }
    next()
})



export const AcademicDepartment=model<TAcademicDepartment>("AcademicDepartment",academicDepartmentSchema)