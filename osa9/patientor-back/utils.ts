import { NewPatient, Gender } from './types';

const isString = (object: unknown): object is string => {
  return typeof object === 'string' || object instanceof String;
};

const parseString = (object: unknown): string => {
  if (!object || !isString(object)) {
    throw new Error('Missing or bad input!');
  }
  return object;
};

const isGender = (object: string): object is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(object);
};

const parseGender = (object: unknown): Gender => {
  if (!object || !isString(object) || !isGender(object)) {
    throw new Error('missing or bad input!');
  }
  return object;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Missing or bad input!');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const patient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };
    return patient;
  }

  throw new Error('Missing fields in input data!');
};
