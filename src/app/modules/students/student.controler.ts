import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAync';




const getAllStudents = catchAsync(async (
  req,
  res,
) => {
  const result = await StudentServices.getAllStudentFromDB();
 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
});
const getSingleStudent =catchAsync(  async (
  req,
  res,

) => {

    const id = req.params.id;
    const result = await StudentServices.getSingleStudentFromBD(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'The single Student',
      data: result,
    });
  })



const updateStudent =catchAsync(  async (
  req,
  res,
) => {
  const studentId = req.params.id;
  const {student}=req.body
    const result = await StudentServices.updateStudentIntoBD(studentId,student);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'The single Student  was successfully updated',
      data: result,
    });
  } 
)
const deleteSingleStudent =catchAsync(  async (
  req,
  res,
) => {
    const id = req.params.id;
    const result = await StudentServices.deleteSingleStudentFromBD(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'The single Student  was successfully deleted',
      data: result,
    });
  } 
)


export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateStudent
};
