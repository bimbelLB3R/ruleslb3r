'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SoalStatus from './SoalStatus';

export default function QuestionNavigation({ totalQuestions, onClose, setCurrentPage }) {
  const [answers, setAnswers] = useState({});

  const router = useRouter();

  useEffect(() => {
    const storedKeys = Object.keys(localStorage);
    const answersObj = {};

    storedKeys.forEach((key) => {
      if (key.startsWith('group')) {
        const match = key.match(/^group(\d+)(_(\d+))?$/);
        if (match) {
          const questionNumber = parseInt(match[1]);
          const subIndex = match[3]; // untuk tipe benarsalah (group30_0, group30_1, dst)
          const value = localStorage.getItem(key);

          if (value && value.trim() !== '') {
            if (subIndex !== undefined) {
              // ✅ Tipe BENAR/SALAH - gabungkan semua sub-jawaban
              if (!answersObj[questionNumber]) {
                answersObj[questionNumber] = [];
              }
              answersObj[questionNumber].push({
                index: parseInt(subIndex),
                value: value
              });
            } else {
              // ✅ Tipe lainnya (pilihan ganda, checkbox, input angka)
              answersObj[questionNumber] = value;
            }
          }
        }
      }
    });

    // ✅ Proses jawaban untuk format yang diinginkan
    Object.keys(answersObj).forEach((key) => {
      const answer = answersObj[key];
      
      if (Array.isArray(answer)) {
        // ✅ Tipe BENAR/SALAH - urutkan berdasarkan index, lalu gabung tanpa koma
        answersObj[key] = answer
          .sort((a, b) => a.index - b.index)
          .map(item => item.value)
          .join('');
      } else if (typeof answer === 'string' && answer.includes(',')) {
        // ✅ Tipe CHECKBOX - urutkan angka, lalu gabung tanpa koma
        const numbers = answer.split(',').map(num => parseInt(num.trim()));
        answersObj[key] = numbers.sort((a, b) => a - b).join('');
      }
      // ✅ Tipe lainnya (A, B, C, D, E atau input angka) tetap apa adanya
    });

    setAnswers(answersObj);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-[80%] max-w-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          ✖
        </button>
        <SoalStatus />
        <h2 className="text-lg font-bold mb-4">Navigasi Soal</h2>

        {/* Daftar Soal */}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const questionNumber = index + 1;
            const answer = answers[questionNumber];

            return (
              <button
                key={index}
                className={`px-3 py-1 rounded text-white font-bold flex justify-between items-center gap-2
                  ${answer ? 'bg-green-600' : 'bg-gray-600'}`}
                onClick={() => setCurrentPage(questionNumber)}
              >
                <span>{questionNumber}</span>
                {answer && (
                  <span className="bg-white text-black px-2 rounded text-sm">
                    {answer}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}