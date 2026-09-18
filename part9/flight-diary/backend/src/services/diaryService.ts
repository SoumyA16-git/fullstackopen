import fs from 'fs';
import path from 'path';
import { Weather, Visibility, type DiaryEntry, type NonSensitiveDiaryEntry, type NewDiaryEntry } from '../types.ts';

const dataPath = path.resolve(import.meta.dirname, '../../data/entries.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const initialEntries = JSON.parse(rawData) as Array<{
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}>;

const diaries: DiaryEntry[] = initialEntries.map((e) => ({
  id: e.id,
  date: e.date,
  weather: e.weather as Weather,
  visibility: e.visibility as Visibility,
  comment: e.comment,
}));

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find((d) => d.id === id);
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry: DiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id), 0) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addDiary,
};
