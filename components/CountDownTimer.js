import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isClient, setIsClient] = useState(false);

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
    setIsClient(true); // Pastikan rendering hanya terjadi di klien
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer); // Bersihkan interval saat komponen di-unmount
  }, [targetDate]);

  if (!isClient) {
    // Tampilkan loading atau kosong sebelum komponen dirender di klien
    return null;
  }

  return (
    <div>
      <p className="text-gray-300 text-[8px] text-center">
        ({timeLeft.days || 0} Hari : {timeLeft.hours || 0} Jam : {timeLeft.minutes || 0} Menit : {timeLeft.seconds || 0} Detik) lagi.
      </p>
    </div>
  );
};

export default CountdownTimer;
