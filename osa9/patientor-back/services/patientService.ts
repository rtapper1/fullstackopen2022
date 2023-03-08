import { v1 as uuid } from 'uuid';

import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

export const getAllPatients = (): Patient[] => {
  return patients;
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid() as string,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};
