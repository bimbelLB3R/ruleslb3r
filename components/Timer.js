import React, { useState, useEffect } from 'react';
export default function Timer(initialTimeLeft) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  useEffect(() => {
    //   localStorage.setItem('timer', timeLeft);
    const initialTimeLeft = localStorage.getItem('timer') || 10;
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(intervalId);
      submitFormAuto();
      localStorage.clear();
      router.push('/');
    }

    return () => {
      clearInterval(intervalId);
      setTimeLeft(initialTimeLeft);
    };
  }, []);

  return <div>Time Left: seconds</div>;
}
