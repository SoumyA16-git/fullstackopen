import express, { type Request, type Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import { toNewPatient, toNewEntry } from '../utils.ts';
import type { NonSensitivePatient, Patient, Entry } from '../types.ts';

const router = express.Router();

router.get('/', (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req: Request, res: Response<Patient | { error: string }>) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const patient = patientService.findById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

router.post('/', (req: Request, res: Response<Patient | { error: unknown }>) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
});

router.post('/:id/entries', (req: Request, res: Response<Entry | { error: unknown }>) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const patient = patientService.findById(id);
  if (!patient) {
    res.status(404).json({ error: 'Patient not found' });
    return;
  }

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
});

export default router;
