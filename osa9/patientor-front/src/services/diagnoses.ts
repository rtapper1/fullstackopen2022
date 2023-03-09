import axios from 'axios';

import { Diagnosis } from '../types';

const baseUrl = 'http://localhost:3001';

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${baseUrl}/api/diagnoses`);

  return data;
};

export default { getAll };
