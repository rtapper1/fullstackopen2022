import express from 'express';
import {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry,
} from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const patientRouter = express.Router();

patientRouter.get('', (_req, res) => {
  res.json(getNonSensitivePatients());
});

patientRouter.get('/:id', (req, res) => {
  res.json(getPatient(req.params.id));
});

patientRouter.post('', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = addPatient(newPatient);
  res.status(201).json(addedPatient);
});

patientRouter.post('/:id/entries', (req, res) => {
  const newEntry = toNewEntry(req.body);
  const addedEntry = addEntry(req.params.id, newEntry);
  res.status(201).json(addedEntry);
});

export default patientRouter;
