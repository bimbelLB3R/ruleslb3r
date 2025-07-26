import { useEffect, useState, useRef } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const prevSecondsRef = useRef(null);

  const calculateTimeLeft = (targetDate) => {
    const difference = new Date(targetDate) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (prevSecondsRef.current !== newTimeLeft.seconds) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
        prevSecondsRef.current = newTimeLeft.seconds;
      }
    };

    updateTimer(); // run immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-center">
      <div className="flex justify-center space-x-4">
        {/* Days */}
        <TimeBox label="Hari" value={timeLeft.days} />
        {/* Hours */}
        <TimeBox label="Jam" value={timeLeft.hours} />
        {/* Minutes */}
        <TimeBox label="Menit" value={timeLeft.minutes} />
        {/* Seconds with animation */}
        <div className="relative w-10 h-10 overflow-hidden">
          <div
            className={`absolute inset-0 transition-transform duration-300 ${
              isAnimating ? "-translate-y-full" : "translate-y-0"
            }`}
          >
            <p className="text-lg font-bold bg-red-600 p-1">
              {timeLeft.seconds ?? 0}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-white mt-2">Menuju UTBK SNBT</p>
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div className="text-center">
    <p className="text-lg font-bold bg-white p-1">{value ?? 0}</p>
    <p className="text-sm text-white">{label}</p>
  </div>
);

export default CountdownTimer;
