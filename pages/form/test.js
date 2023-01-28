import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(dayjs.duration(30, 'minute'));

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft.asSeconds() <= 0) {
        clearInterval(interval);
        alert("Time's up!");
      } else {
        setTimeLeft(timeLeft.subtract(1, 'second'));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return <div>Time left: {timeLeft.format('mm:ss')}</div>;
}
