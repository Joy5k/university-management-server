import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchAbleFields } from './student.const';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  //নিচে await  এর পরে মডেলকে কল করতে হবে। কেননা মডেলের উপর ভিত্তি করেই ডাটা ক্রিয়েট বা
  //গেট করবে
  // const queryObj = { ...query }

  // let searchTerm = ""
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }
  // console.log(query);
  // const searchQuery = Student.find({
  //   $or: studentSearchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   }))
  // });

  // //Filtering
  // const excludeField = ['searchTerm', 'sort', 'limit', 'page','fields']
  // excludeField.forEach(el => delete queryObj[el])
  // console.log({ query }, {queryObj});
  // const filterQuery =  searchQuery.find(queryObj).populate("admissionSemester").populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: "academicFaculty"
  //   },
  // });
  // let sort='-createdAt'
  // if (query.sort) {
  //   sort=query.sort as string
  // }


  // const sortQuery= filterQuery.sort(sort)
  // let limit = 1;
  // let page = 1;
  // let skip=0
  // if (query.limit) {
  //   limit = Number(query.limit)
  // }
  // if (query.page) {
  //   page = Number(query.page)
  //   skip=(page-1)*limit
  // }
  
  // const paginateQuery= sortQuery.skip(skip)
  // const limitQuery =  paginateQuery.limit(limit)
  // let fields = '-__v'
  // if (query.fields) {
  //   fields=(query.fields  as string).split(',').join(' ')
  // }

  // const fieldQuery=await limitQuery.select(fields)

  // return fieldQuery;
  
  const studentQuery = new QueryBuilder(Student.find().populate("admissionSemester").populate({
    path: 'academicDepartment',
  populate: {
      path: "academicFaculty"
   },
  }), query).search(studentSearchAbleFields).fields().filter().sort().paginate()
  const result = await studentQuery.modelQuery;
  return result
  
};
const getSingleStudentFromBD = async (id: string) => {
  //নিচে await  এর পরে মডেলকে কল করতে হবে। কেননা মডেলের উপর ভিত্তি করেই ডাটা ক্রিয়েট বা
  //গেট করবে
  const result = await Student.findOne({ id }).populate({
    path: 'academicDepartment',
    populate: {
      path: "academicFaculty"
    }
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND,"user not found")
  }
  return result;
};


const updateStudentIntoBD = async (id: string,payload:Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData:Record<string,unknown>={...remainingStudentData}

  if (name&& Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
  }
}

  if (guardian&& Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
  }
}

  if (localGuardian&& Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
  }
}


  const result = await Student.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true ,runValidators:true},
  )
  return result
};



const deleteSingleStudentFromBD = async (id: string) => {
  //নিচে await  এর পরে মডেলকে কল করতে হবে। কেননা মডেলের উপর ভিত্তি করেই ডাটা ক্রিয়েট বা
  //গেট করবে
  const existingUser = await Student.findOne({ id });
  
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND,"User doesn't exists")
  }
const session=await mongoose.startSession()
  try {

    session.startTransaction()
    const deletedStudent = await Student.updateOne({ id },
      { isDeleted: true }, { new: true, session });
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed the Deleted Student")
    }
    const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, {
      new: true,
      session
    })
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete user")
    }
  await session.commitTransaction()
    await session.endSession()
    
    return deletedStudent;
    
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error("Failed to delete student")
  }
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromBD,
  updateStudentIntoBD,
  deleteSingleStudentFromBD,
}
