import { NewPatient, Gender, NewEntry } from './types';

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

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Missing or bad input!');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    switch (object.type) {
      case 'Hospital':
        if ('discharge' in object) {
          break;
        } else {
          throw new Error('Discharge attribute missing!');
        }
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          break;
        } else {
          throw new Error('Health check rating attribute missing!');
        }
      case 'OccupationalHealthCare':
        if ('employer' in object && 'sickLeave' in object) {
          break;
        } else {
          throw new Error(
            'Occupational healthcare attribute(s) check rating attribute missing!'
          );
        }
      default:
        throw new Error('Unknown type!');
    }
    return object as NewEntry;
  }
  throw new Error('Unknown data format!');
};
