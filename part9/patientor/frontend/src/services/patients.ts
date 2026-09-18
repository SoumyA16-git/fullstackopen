import axios from 'axios';
import type { Patient, PatientFormValues, Entry, EntryWithoutId } from '../types.ts';

const apiBaseUrl = 'http://localhost:3001/api';

const getAll = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const createEntry = async (patientId: string, object: EntryWithoutId): Promise<Entry> => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, object);
  return data;
};

export default {
  getAll,
  getById,
  create,
  createEntry,
};
