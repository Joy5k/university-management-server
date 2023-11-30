import { z } from 'zod';

const CreateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => value[0] === value[0].toUpperCase(), {
      message: 'First name must be capitalized',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const CreateGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const CreateLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password:z.string().max(20),
    student: z.object({
      name: CreateUserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z
      .enum(['A+', 'B+', 'AB+', 'O+', '-A', '-B', '-AB', '-O'])
      .optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: CreateGuardianValidationSchema,
    localGuardian: CreateLocalGuardianValidationSchema,
    admissionSemester:z.string(),
    profileImg: z.string().optional(),
    })
  })
})
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: CreateUserNameValidationSchema.optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'B+', 'AB+', 'O+', '-A', '-B', '-AB', '-O'])
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: CreateGuardianValidationSchema.optional(),
    localGuardian: CreateLocalGuardianValidationSchema.optional(),
    admissionSemester:z.string(),
    profileImg: z.string().optional(),
    })
  })
})
 
export const StudentValidations = {
   createStudentValidationSchema,
   updateStudentValidationSchema
};
