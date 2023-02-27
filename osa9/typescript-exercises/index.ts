import express from 'express';
import bmiCalculator from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.weight))) {
    res.json({
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: bmiCalculator(Number(req.query.height), Number(req.query.weight)),
    });
  } else {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  const days = daily_exercises as number[];
  if (!days || !target) {
    res.status(400).send({
      error: 'parameters missing',
    });
  }
  days.forEach((d) => {
    if (isNaN(Number(d)) || isNaN(Number(target))) {
      res.status(400).send({
        error: 'malformatted parameters',
      });
    }
  });

  res.json(calculateExercises(days, Number(target)));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
