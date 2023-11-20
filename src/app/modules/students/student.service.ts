import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentInToDB = async (studentData: TStudent) => {
  // const result = await Student.create(student);
  // return result;
  const student = new Student(studentData)// create an instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error("User ALready Exists")
  }
  const result = await student.save();
  return result;

};
const getAllStudentFromDB = async () => {
  //নিচে await  এর পরে মডেলকে কল করতে হবে। কেননা মডেলের উপর ভিত্তি করেই ডাটা ক্রিয়েট বা
  //গেট করবে
  const result = await Student.find();
  return result;
};
const getSingleStudentFromBD = async (id: string) => {
  //নিচে await  এর পরে মডেলকে কল করতে হবে। কেননা মডেলের উপর ভিত্তি করেই ডাটা ক্রিয়েট বা
  //গেট করবে
  const result = await Student.findOne({ id });
  return result;
};
const deleteSingleStudentFromBD = async (id: string) => {
  //নিচে await  এর পরে মডেলকে কল করতে হবে। কেননা মডেলের উপর ভিত্তি করেই ডাটা ক্রিয়েট বা
  //গেট করবে
  const result = await Student.updateOne({ id },{isDeleted:true});
  return result;
};
export const StudentServices = {
  createStudentInToDB,
  getAllStudentFromDB,
  getSingleStudentFromBD,
  deleteSingleStudentFromBD
};
