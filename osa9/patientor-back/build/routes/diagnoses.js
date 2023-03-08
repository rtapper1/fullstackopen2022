"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = require("../services/diagnoseService");
const diagnosesRouter = express_1.default.Router();
diagnosesRouter.get('', (_req, res) => {
    res.json((0, diagnoseService_1.getAllDiagnoses)());
});
exports.default = diagnosesRouter;
