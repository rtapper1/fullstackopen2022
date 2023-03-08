import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';

import diaryService from './services/diaries';
import Entries from './components/Entries';
import AddEntry from './components/AddEntry';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    console.log('Getting diaries!');
    diaryService
      .getDiaries()
      .then((res) => {
        if (res) {
          setDiaries(res);
        }
        console.log('Diaries: ', res);
      })
      .catch((err) => console.log('Something went wrong:', err));
  }, []);

  const handleAddition = (addition: DiaryEntry): void => {
    setDiaries(diaries.concat(addition));
  };

  return (
    <div>
      <AddEntry handleAddition={handleAddition} />
      <Entries entries={diaries} />
    </div>
  );
};

export default App;
