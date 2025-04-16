"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../libs/prisma"));
const router = (0, express_1.Router)();
// interface Patient {
//   id: number;
//   name: string;
//   dateOfBirth: Date;
//   status: 'active' | 'inactive';
// }
router.get('/', async (req, res) => {
    res.json(await prisma_1.default.patient.findMany());
    //TODO: implement the logic to fetch patients from a database
});
router.post('/', (req, res) => {
    //TODO: implement the logic to add a new patient to a database
});
router.patch('/:id', (req, res) => {
    //TODO: implement the logic to update a patient in a database
});
router.delete('/:id', (req, res) => {
    //TODO: implement the logic to delete a patient from a database
});
exports.default = router;
