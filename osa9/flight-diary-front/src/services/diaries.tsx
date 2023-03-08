import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api';

const getDiaries = () => {
  return axios.get<DiaryEntry[]>(`${baseUrl}/diaries`).then((res) => res.data);
};

const addEntry = (newEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(`${baseUrl}/diaries`, newEntry)
    .then((res) => res.data);
};

export default { getDiaries, addEntry };
