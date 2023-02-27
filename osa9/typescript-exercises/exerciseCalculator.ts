interface Input {
  days: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  const [, , target, ...days] = args;
  if (isNaN(Number(target))) throw new Error('Bad target input! :(');
  days.forEach((d) => {
    if (isNaN(Number(d))) throw new Error('Bad input! :(');
  });
  return {
    days: days.map((d) => Number(d)),
    target: Number(target),
  };
};

const calculateExercises = (days: number[], target: number): Result => {
  const averageHours = days.reduce((sum, day) => sum + day, 0) / days.length;
  const rating = Math.max(
    Math.min(Math.floor((averageHours * 3) / target), 3),
    0
  );
  let ratingDescription;
  switch (rating) {
    case 1: {
      ratingDescription = 'Terrible';
      break;
    }
    case 2: {
      ratingDescription = 'Not good, not horrible';
      break;
    }
    case 3: {
      ratingDescription = 'Good job!';
      break;
    }
    default: {
      ratingDescription = 'Weird results!';
      break;
    }
  }
  return {
    periodLength: days.length,
    trainingDays: days.filter((d) => d > 0).length,
    success: averageHours >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageHours,
  };
};

try {
  const { days, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = 'Something went horribly wrong!';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
