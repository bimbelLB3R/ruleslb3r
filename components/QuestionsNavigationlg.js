'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SoalStatus from './SoalStatus';

export default function QuestionNavigationlg({ totalQuestions, refreshKey,setCurrentPage }) {
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const router = useRouter();

  useEffect(() => {
    const storedKeys = Object.keys(localStorage);
    const answeredSet = new Set();

    storedKeys.forEach((key) => {
      if (key.startsWith('group')) {
        const value = localStorage.getItem(key);
        if (value && value.trim() !== '') {
          const match = key.match(/^group(\d+)/);
          if (match) {
            answeredSet.add(parseInt(match[1]));
          }
        }
      }
    });

    setAnsweredQuestions(answeredSet);
  }, [refreshKey]);//kalau diberi ketergantungan pada answeredQuestions maka eror

  

  return (
    
      <div className="bg-white p-4 relative">
        <SoalStatus/>
        <h2 className="text-lg font-bold mb-4">Navigasi Soal</h2>

        {/* Daftar Soal */}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const isAnswered = answeredQuestions.has(index);
            return (
              <button
                name='navSoal'
                type='button'
                key={index}
                className={`px-3 py-1 rounded text-white font-bold 
                  ${isAnswered ? 'bg-green-600' : 'bg-gray-600'}`}
                  onClick={() => {
                    setCurrentPage(index + 1);}}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* Tombol Kirim */}
        
      </div>
  );
}
