import { StudentModel } from '../student.model';
import { Student } from './student.interfacee';

const createStudentInToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
const getAllStudentFromDB = async () => {
  //নিচে await  এর পরে মডেলকে কল করতে হবে। কেননা মডেলের উপর ভিত্তি করেই ডাটা ক্রিয়েট বা
  //গেট করবে
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromBD = async (id: string) => {
  //নিচে await  এর পরে মডেলকে কল করতে হবে। কেননা মডেলের উপর ভিত্তি করেই ডাটা ক্রিয়েট বা
  //গেট করবে
  const result = await StudentModel.findOne({ id });
  return result;
};
export const StudentServices = {
  createStudentInToDB,
  getAllStudentFromDB,
  getSingleStudentFromBD,
};
