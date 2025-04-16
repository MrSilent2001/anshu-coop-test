import { Router } from 'express';
import prisma from '../libs/prisma';

const router = Router();

// interface Patient {
//   id: number;
//   name: string;
//   dateOfBirth: Date;
//   status: 'active' | 'inactive';
// }

router.get('/', async (req, res) => {
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

export default router;
