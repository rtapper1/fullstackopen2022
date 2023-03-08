"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.getNonSensitivePatients = exports.getAllPatients = void 0;
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const getAllPatients = () => {
    return patients_1.default;
};
exports.getAllPatients = getAllPatients;
const getNonSensitivePatients = () => {
    return patients_1.default.map((patient) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn } = patient, nonSensitivePatient = __rest(patient, ["ssn"]);
        return nonSensitivePatient;
    });
};
exports.getNonSensitivePatients = getNonSensitivePatients;
const addPatient = (patient) => {
    const newPatient = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: (0, uuid_1.v1)() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.addPatient = addPatient;
