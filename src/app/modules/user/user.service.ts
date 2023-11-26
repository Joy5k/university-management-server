import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentInToDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'student';
  userData.id = '2030100001';

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;

    studentData.user = newUser._id; //reference Id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  return newUser;
};
export const UserService = {
  createStudentInToDB,
};