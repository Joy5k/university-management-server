import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import StudentValidationSchema from './student.validation';
// import studentValidationSchema from './student.joi.validation';


const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;
    // The below code is for Joi
    // const { error,value } = studentValidationSchema.validate(StudentData);
    // const zodparsedData=StudentValidationSchema.parse(StudentData)
    const result = await StudentServices.createStudentInToDB(StudentData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something wen wrong',
    //      error:error.details,
    //   }); 
    // }
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message:error.message|| 'Something went wrong',
      Result: error,
    });  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      succuss: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
    success: false,
    message: 'Something wen wrong',
    Result: error,
  });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSingleStudentFromBD(id);
    res.status(200).json({
      success: true,
      message: 'The single Student',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something wen wrong',
      Result: error,
    });
  }
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.deleteSingleStudentFromBD(id);
    res.status(200).json({
      success: true,
      message: 'The single Student  was successfully deleted',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message:error.message|| 'Something wen wrong',
      Result: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
