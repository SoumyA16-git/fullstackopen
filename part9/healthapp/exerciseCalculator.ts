export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (isNaN(target) || target <= 0) {
    throw new Error('Target value was not a valid positive number!');
  }

  const dailyHours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const hours = Number(args[i]);
    if (isNaN(hours) || hours < 0) {
      throw new Error('Daily exercise hours contained an invalid number!');
    }
    dailyHours.push(hours);
  }

  return {
    target,
    dailyHours,
  };
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = periodLength > 0 ? totalHours / periodLength : 0;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'bad';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great work, target reached!';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
