"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const utils_1 = require("../utils");
const patientRouter = express_1.default.Router();
patientRouter.get('', (_req, res) => {
    res.json((0, patientService_1.getNonSensitivePatients)());
});
patientRouter.post('', (req, res) => {
    const newPatient = (0, utils_1.toNewPatient)(req.body);
    const addedPatient = (0, patientService_1.addPatient)(newPatient);
    res.status(201).json(addedPatient);
});
exports.default = patientRouter;
