import { DiaryEntry } from '../types';

const Entries = ({ entries }: { entries: DiaryEntry[] }) => (
  <div>
    <h1>Diary Entries</h1>
    {entries.map((e) => (
      <div key={e.id}>
        <h2>{e.date}</h2>
        visibility: {e.visibility}
        <br />
        weather: {e.weather}
      </div>
    ))}
  </div>
);

export default Entries;
