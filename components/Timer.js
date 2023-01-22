import { useState } from 'react';

function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  let intervalId;

  function startTimer() {
    intervalId = setInterval(() => {
      setElapsedTime(elapsedTime + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  function resetTimer() {
    clearInterval(intervalId);
    setElapsedTime(0);
  }

  return (
    <div>
      <p>Elapsed Time: {elapsedTime} seconds</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
