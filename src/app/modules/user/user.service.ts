import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentInToDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'student';


  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
  if(!admissionSemester){
    throw new Error("Admission semester not found")
    }
  userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;

    payload.user = newUser._id; //reference Id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
  return newUser;
};
export const UserService = {
  createStudentInToDB,
};
