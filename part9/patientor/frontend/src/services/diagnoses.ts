import axios from 'axios';
import type { Diagnosis } from '../types.ts';

const apiBaseUrl = 'http://localhost:3001/api';

const getAll = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

export default {
  getAll,
};
