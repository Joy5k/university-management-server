import { StudentModel } from "../student.model";
import { Student } from "./student.interfacee";

const createStudentInToDB = async(student: Student) => {
    const result = await StudentModel.create(student)
    return result;
}
export const StudentServices = {
    createStudentInToDB,
}