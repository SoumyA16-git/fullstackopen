import express, { type Request, type Response } from 'express';
import cors from 'cors';
import diariesRouter from './routes/diaries.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.use('/api/diaries', diariesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Flight diary backend running on port ${PORT}`);
});
