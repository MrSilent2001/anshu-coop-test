import { Router } from 'express';
import prisma from '../libs/prisma';
import {$Enums} from "../generated/prisma";
import Status = $Enums.Status;

const router = Router();

// interface Patient {
//   id: number;
//   name: string;
//   dateOfBirth: Date;
//   status: 'active' | 'inactive';
// }

router.get('/getAll', async (req, res) => {
  //TODO: implement the logic to fetch patients from a database
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const offset = (page - 1) * limit;

        const filter = req.query.status as string;
        const where: any = {};

        if (filter === 'Active') {
            where.status = 'ACTIVE';
        }

        if (filter === 'Inactive') {
            where.status = 'INACTIVE';
        }

        const patients = await prisma.patient.findMany({
            where: where,
            skip: offset,
            take: limit,
            orderBy: {id: 'asc'},
        });

        const total = await prisma.patient.count({
            where: where,
        });

        res.status(200).json({
            data: patients,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    }catch(error: any){
        res.status(500).json({error: error.message});
    }
});

router.post('/create', async (req, res) => {
  //TODO: implement the logic to add a new patient to a database
    try{
        const newPatient = await prisma.patient.create({
            data:{
                name: req.body.name,
                dateOfBirth: new Date(req.body.dateOfBirth),
                status: req.body.status as Status,
            }
        });

        return res.status(201).json(newPatient);
    }catch (error:any){
        return res.status(500).json({error: error.message});
    }
});

router.patch('/update/:id', async (req, res) => {
  //TODO: implement the logic to update a patient in a database
    try{
        const patientId = parseInt(req.params.id);

        if (! await prisma.patient.findUnique({
            where: {
                id: patientId
            }
        })) {
            return res.status(404).json({error: "Patient does not exist"});
        }

        const updatedPatient = await prisma.patient.update({
            data:{
                status: req.body.status
            },
            where:{
                id: patientId
            }
        });

        res.status(200).json(updatedPatient);
    }catch(error: any){
        res.status(500).json({error: error.message});
    }
});

router.delete('/delete/:id', async(req, res) => {
  //TODO: implement the logic to delete a patient from a database
    try{
        const patientId = parseInt(req.params.id);
        if (!await prisma.patient.findUnique({
            where:{
                id: patientId
            }
        })){
            return res.status(404).json({error: "Patient does not exist"});
        }

        const deletedPatient = await prisma.patient.delete({
            where:{
                id: patientId
            }
        });

        res.status(200).json(deletedPatient);

    }catch(error: any){
        res.status(500).json({error: error.message});
    }
});

router.get('/search', async (req, res) => {
    //Logic to search patients by their names
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.name as string;

        const searchResults = await prisma.patient.findMany({
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            skip: offset,
            take: limit,
            orderBy: {id: 'asc'},
        })

        return res.status(200).json(searchResults);

    }catch(error: any){
        res.status(500).json({error: error.message});
    }
});

export default router;
