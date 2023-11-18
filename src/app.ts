import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.route';

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});
export default app;
