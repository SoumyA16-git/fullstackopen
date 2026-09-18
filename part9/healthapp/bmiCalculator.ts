interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
    return {
      height,
      weight,
    };
  } else {
    throw new Error('Provided values were not valid numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25.0) {
    return 'Normal range';
  } else if (bmi < 30.0) {
    return 'Overweight';
  } else if (bmi < 35.0) {
    return 'Obese (Class I)';
  } else if (bmi < 40.0) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
