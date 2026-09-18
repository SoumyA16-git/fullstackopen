import { z } from 'zod';
import { Gender, HealthCheckRating, type NewPatient, type NewEntry } from './types.ts';

export const NewPatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  ssn: z.string().min(1, 'SSN is required'),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1, 'Occupation is required'),
  entries: z.array(z.any()).optional().default([]),
});

const BaseEntrySchema = z.object({
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  specialist: z.string().min(1, 'Specialist is required'),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().min(1, 'Discharge date is required'),
    criteria: z.string().min(1, 'Discharge criteria is required'),
  }),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(1, 'Employer name is required'),
  sickLeave: z
    .object({
      startDate: z.string().min(1, 'Sick leave start date is required'),
      endDate: z.string().min(1, 'Sick leave end date is required'),
    })
    .optional(),
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};
