import type { DiaryEntry } from '../types.ts';

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id} style={{ marginBottom: '1.2em' }}>
          <h3 style={{ margin: '0 0 0.3em 0' }}>{diary.date}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
          {diary.comment && <div><em>{diary.comment}</em></div>}
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
