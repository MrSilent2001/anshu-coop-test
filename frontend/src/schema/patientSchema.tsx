import { z } from 'zod';

export const patientSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Name is required'),
    dateOfBirth: z.coerce.date(),
    status: z.string().min(1, 'Status is required'),
});