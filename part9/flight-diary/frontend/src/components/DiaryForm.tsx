import React, { useState } from 'react';
import { Weather, Visibility, type NewDiaryEntry } from '../types.ts';

interface DiaryFormProps {
  onAddDiary: (entry: NewDiaryEntry) => Promise<void>;
}

const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onAddDiary({
      date,
      visibility,
      weather,
      comment: comment || undefined,
    });
    setDate('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5em' }}>
          <label htmlFor="diary-date"><strong>date</strong> </label>
          <input
            id="diary-date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '0.5em' }}>
          <span><strong>visibility</strong> </span>
          {Object.values(Visibility).map((v) => (
            <label key={v} style={{ marginRight: '1em' }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: '0.5em' }}>
          <span><strong>weather</strong> </span>
          {Object.values(Weather).map((w) => (
            <label key={w} style={{ marginRight: '1em' }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: '0.5em' }}>
          <label htmlFor="diary-comment"><strong>comment</strong> </label>
          <input
            id="diary-comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
