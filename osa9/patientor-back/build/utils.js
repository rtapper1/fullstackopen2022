"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (object) => {
    return typeof object === 'string' || object instanceof String;
};
const parseString = (object) => {
    if (!object || !isString(object)) {
        throw new Error('Missing or bad input!');
    }
    return object;
};
const isGender = (object) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(object);
};
const parseGender = (object) => {
    if (!object || !isString(object) || !isGender(object)) {
        throw new Error('missing or bad input!');
    }
    return object;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Missing or bad input!');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object) {
        const patient = {
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
exports.toNewPatient = toNewPatient;
