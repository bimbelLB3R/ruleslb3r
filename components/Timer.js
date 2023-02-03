import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function Timer() {
  const [isRadioButtonDisabled, setIsRadioButtonDisabled] = useState(false);
  // console.log(isRadioButtonDisabled);true
  const [timeLeft, setTimeLeft] = useState(dayjs.duration(30, 'minute'));
  const [timeStorage, setTimeStorage] = useState(null);

  useEffect(() => {
    const timeStorage = localStorage.getItem('timeLeft');
    // console.log(timeStorage);
    if (timeStorage) {
      setTimeStorage(dayjs.duration(parseInt(timeStorage), 'second'));
      setTimeLeft(dayjs.duration(parseInt(timeStorage), 'second'));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timeLeft', timeLeft.asSeconds());
  }, [timeLeft]);

  useEffect(() => {
    if (!timeLeft) {
      return;
    }
    const interval = setInterval(() => {
      if (timeLeft.asSeconds() <= 0) {
        clearInterval(interval);
        alert("Time's up!");
        // setIsRadioButtonDisabled(true);
      } else {
        setTimeLeft(timeLeft.subtract(1, 'second'));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return <div>{timeLeft ? timeLeft.format('mm:ss') : 'Loading...'}</div>;
  // return isRadioButtonDisabled;
}
