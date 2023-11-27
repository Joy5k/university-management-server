import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  Months,
  AcademicSemesterCode,
  AcademicSemesterName,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: Date,
      require: true,
    },
    startMonth: {
      type: String,
      enum: Months,
    },

    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);
export const academicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
