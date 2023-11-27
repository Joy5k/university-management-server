import { z } from 'zod';

const UserNameValidationSchema = z.object({
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

const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password:z.string().max(20),
    student: z.object({
      name: UserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.date().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z
      .enum(['A+', 'B+', 'AB+', 'O+', '-A', '-B', '-AB', '-O'])
      .optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    profileImg: z.string().optional(),
    })
  })
})
 
export const StudentValidations = {
   createStudentValidationSchema

};
