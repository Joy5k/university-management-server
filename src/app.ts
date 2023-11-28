/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AcademicSemesterRoute } from './app/modules/academicSemester/academicSemester.route';
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes); 
app.use('/api/v1/academic-semesters', AcademicSemesterRoute); 
// app.use("/api/v1",routes)

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});
app.use(globalErrorHandler);

app.use(notFound);
export default app;
