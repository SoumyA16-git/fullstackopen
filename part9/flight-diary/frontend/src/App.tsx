import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllDiaries, createDiary } from './services/diaryService.ts';
import type { DiaryEntry, NewDiaryEntry } from './types.ts';
import Notification from './components/Notification.tsx';
import DiaryForm from './components/DiaryForm.tsx';
import DiaryList from './components/DiaryList.tsx';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries()
      .then((data) => {
        setDiaries(data);
      })
      .catch((err: unknown) => {
        console.error('Failed to fetch diaries', err);
      });
  }, []);

  const handleAddDiary = async (newEntry: NewDiaryEntry) => {
    try {
      const addedEntry = await createDiary(newEntry);
      setDiaries(diaries.concat(addedEntry));
      setErrorMessage(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data &&
          typeof error.response.data === 'object' &&
          'error' in error.response.data
        ) {
          const errData = error.response.data as {
            error: string | Array<{ message: string }>;
          };
          if (Array.isArray(errData.error)) {
            setErrorMessage(errData.error.map((e) => e.message).join(', '));
          } else {
            setErrorMessage(String(errData.error));
          }
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', margin: '2em' }}>
      <Notification message={errorMessage} />
      <DiaryForm onAddDiary={handleAddDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
