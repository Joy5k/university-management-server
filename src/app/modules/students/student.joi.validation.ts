import Joi from "joi";


const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .trim()
      .max(20)
      .pattern(/^[A-Z][a-z]*$/)
      .messages({
        'string.pattern.base': '{#label} must be capitalized',
      }),
    middleName: Joi.string(),
    lastName: Joi.string()
      .required()
      .pattern(/^[A-Za-z]+$/)
      .messages({
        'string.pattern.base': '{#label} is not a valid last name',
      }),
  });
  
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });
  
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'B+', 'AB+', 'O+', '-A', '-B', '-AB', '-O'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });
  
export default studentValidationSchema;