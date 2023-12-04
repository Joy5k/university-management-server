import { z } from 'zod';

const CreateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'academic department must be string',
      required_error: 'faculty is required',
    }),
  }),
});
const UpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'academic department must be string',
        required_error: 'faculty is required',
      })
      .optional(),
  }),
});
export const AcademicDepartmentValidation = {
  CreateAcademicDepartmentValidationSchema,
  UpdateAcademicDepartmentValidationSchema,
};
