import express, { type Request, type Response } from 'express';
import { z } from 'zod';
import diaryService from '../services/diaryService.ts';
import { toNewDiaryEntry } from '../utils.ts';
import type { NonSensitiveDiaryEntry, DiaryEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req: Request, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.json(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request, res: Response<DiaryEntry | { error: string }>) => {
  const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const diary = diaryService.findById(Number(idParam));
  if (diary) {
    res.json(diary);
  } else {
    res.status(404).json({ error: 'Diary entry not found' });
  }
});

router.post('/', (req: Request, res: Response<DiaryEntry | { error: unknown }>) => {
  try {
    const newEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newEntry);
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
