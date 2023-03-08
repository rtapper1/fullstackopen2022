import express from 'express';

import { getAllDiagnoses } from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('', (_req, res) => {
  res.json(getAllDiagnoses());
});

export default diagnosesRouter;
