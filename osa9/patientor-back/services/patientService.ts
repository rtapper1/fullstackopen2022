import { v1 as uuid } from 'uuid';

import patients from '../data/patients';
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from '../types';

export const getAllPatients = (): Patient[] => {
  return patients;
};

export const getPatient = (id: string): NonSensitivePatient | undefined => {
  return patients.find((p) => p.id === id);
};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitivePatient } = patient;
    return nonSensitivePatient;
  });
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patients.find((p) => p.id === id)?.entries.push(newEntry);
  return newEntry;
};
