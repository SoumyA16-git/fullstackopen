import { z } from 'zod';
import { Weather, Visibility, type NewDiaryEntry } from './types.ts';

export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().min(1, 'Date is required'),
  comment: z.string().optional(),
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};
