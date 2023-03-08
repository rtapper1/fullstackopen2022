import express from 'express';
import {
  getNonSensitivePatients,
  addPatient,
} from '../services/patientService';
import { toNewPatient } from '../utils';

const patientRouter = express.Router();

patientRouter.get('', (_req, res) => {
  res.json(getNonSensitivePatients());
});

patientRouter.post('', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = addPatient(newPatient);
  res.status(201).json(addedPatient);
});

export default patientRouter;
