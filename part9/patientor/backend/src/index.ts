import express, { type Request, type Response } from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
