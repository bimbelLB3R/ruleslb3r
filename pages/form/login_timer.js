import { useState, useEffect } from "react";
import Loginmember from "../../components/Loginmember";
import Head from "next/head";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const CountdownTimer = ({ targetDate, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(
    dayjs(targetDate).diff(dayjs(), "second")
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(dayjs(targetDate).diff(dayjs(), "second"));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, targetDate, onFinish]);

  const formatTime = (seconds) => {
    const d = dayjs.duration(seconds, "seconds");
    return `${d.days()} hari ${d.hours()} jam ${d.minutes()} menit ${d.seconds()} detik`;
  };

  return <div className="flex items-center justify-center h-screen">
    <div className="text-center">
    <div className="flex items-center justify-center text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16">
  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg></div>
    <p className="font-semibold">Simulasi SNBT akan dimulai dalam</p>
    <p>{formatTime(timeLeft)}</p>
    <p>(Sabtu, 15 Maret 2025, pukul 15.00 WITA</p>
    </div>
    </div>;
};

const Login = () => {
  const targetDate = "2025-03-15T14:30:59";
//   const targetDate = "2025-03-15T06:30:59Z"; // Tambahkan 'Z' untuk UTC

  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Head>
        <title>Login Peserta SNBT | Bimbel LB3R</title>
        <meta
          name="description"
          content="Bimbel LB3R menyelenggarakan bimbingan UTBK SNBT dan memberikan latihan soal dengan metode Item Response Theory (IRT)"
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="image/logolb3r.png"
        />
      </Head>

      {!showLogin ? (
        <CountdownTimer targetDate={targetDate} onFinish={() => setShowLogin(true)} />
      ) : (
        <Loginmember />
      )}
    </div>
  );
};

export default Login;
