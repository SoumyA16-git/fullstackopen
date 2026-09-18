import express, { type Request, type Response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi,
  });
});

interface ExerciseRequestBody {
  daily_exercises?: unknown;
  target?: unknown;
}

app.post('/exercises', (req: Request<unknown, unknown, ExerciseRequestBody>, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  const targetNumber = Number(target);
  if (
    isNaN(targetNumber) ||
    targetNumber < 0 ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    daily_exercises.some((val) => isNaN(Number(val)) || Number(val) < 0)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const dailyHours = daily_exercises.map((val) => Number(val));
  const result = calculateExercises(dailyHours, targetNumber);

  res.json(result);
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
