import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [prevSeconds, setPrevSeconds] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  function calculateTimeLeft(targetDate) {
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
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      // Animasi hanya untuk detik
      if (newTimeLeft.seconds !== prevSeconds) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300); // Reset animasi setelah selesai
      }
      setPrevSeconds(newTimeLeft.seconds);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, prevSeconds]);

  return (
    <div className="text-center">
      <div className="flex justify-center space-x-4">
        {/* Days */}
        <div className="text-center ">
          <p className="text-lg font-bold bg-white p-1">{timeLeft.days || 0}</p>
          <p className="text-sm text-white">Hari</p>
        </div>
        {/* Hours */}
        <div className="text-center ">
          <p className="text-lg font-bold bg-white p-1">{timeLeft.hours || 0}</p>
          <p className="text-sm text-white">Jam</p>
        </div>
        {/* Minutes */}
        <div className="text-center ">
          <p className="text-lg font-bold bg-white p-1">{timeLeft.minutes || 0}</p>
          <p className="text-sm text-white">Menit</p>
        </div>
        {/* Seconds with Animation */}
        <div className="relative w-10 h-10 overflow-hidden">
          <div
            className={`absolute inset-0 transition-transform duration-300 ${
              isAnimating ? "transform -translate-y-full" : "transform translate-y-0"
            }`}
          >
            <p className="text-lg font-bold bg-red-600 p-1">{timeLeft.seconds || 0}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-white text-center">Menuju UTBK SNBT</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
