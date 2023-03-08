import { useState } from 'react';
import { AxiosError } from 'axios';

import { NewDiaryEntry, Weather, Visibility, DiaryEntry } from '../types';
import diaryService from '../services/diaries';

const Notification = ({ msg }: { msg: string }) => {
  if (!msg) return null;
  return <div style={{ color: 'red' }}>{msg}</div>;
};

const AddEntry = ({
  handleAddition,
}: {
  handleAddition: (newEntry: DiaryEntry) => void;
}) => {
  const [notif, setNotif] = useState('');
  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setNotif('');
    const target = event.target as typeof event.target & {
      date: { value: string };
      weather: { value: string };
      visib: { value: string };
      comment: { value: string };
    };
    const newEntry: NewDiaryEntry = {
      date: target.date.value,
      weather: target.weather.value as Weather,
      visibility: target.visib.value as Visibility,
      comment: target.comment.value,
    };
    diaryService
      .addEntry(newEntry)
      .then((res) => {
        if (res) {
          handleAddition(res);
        }
      })
      .catch((err: AxiosError) => {
        console.log('Something went wrong: ', err);
        setNotif(err.response?.data as string);
      });
    target.date.value = '';
    target.comment.value = '';
    target.weather.value = '';
    target.visib.value = '';
  };
  return (
    <div>
      <h1>Add new entry</h1>
      <Notification msg={notif} />
      <form onSubmit={handleSubmit}>
        date <input name="date" type="date" />
        <br />
        visibility{' '}
        {Object.values(Visibility).map((v) => (
          <span key={v}>
            <input name="visib" type="radio" value={v} />{' '}
            <label htmlFor={v}>{v}</label>
          </span>
        ))}
        <br />
        weather{' '}
        {Object.values(Weather).map((v) => (
          <span key={v}>
            <input name="weather" type="radio" value={v} />{' '}
            <label htmlFor={v}>{v}</label>
          </span>
        ))}
        <br />
        comment <input name="comment" type="text" />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddEntry;
