import { Student } from './student.model';

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
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromBD,
  deleteSingleStudentFromBD,
};
