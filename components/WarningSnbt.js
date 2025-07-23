import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import CountdownTimer from "./CountDownTimer";

dayjs.extend(duration);

export default function WarningSnbt() {
  const targetDate = "2026-04-23T23:59:59";
  const [nameKu, setNameKu] = useState("");
  const [linkKu, setLinkKu] = useState("");
  const [jenisUjian, setJenisUjian] = useState("");
  const [sisawaktu, setSisaWaktu] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const linkSoal = localStorage.getItem("link");
    const storedJenisUjian = localStorage.getItem("jenisUjian") || "";
    const storedMaxTime = localStorage.getItem("maxTime");

    const maxTimeInSeconds = parseInt(storedMaxTime);
    const currentTime = dayjs();
    const startTime = localStorage.getItem("startTime")
      ? dayjs(localStorage.getItem("startTime"))
      : currentTime;

    const elapsedTime = currentTime.diff(startTime, "second");
    const remainingTime = Math.max(0, maxTimeInSeconds - elapsedTime);

    setNameKu(storedName);
    setLinkKu(linkSoal);
    setJenisUjian(storedJenisUjian);
    setSisaWaktu(remainingTime);
  }, []);

  // Soal TKA (boleh tetap ada, tapi sekarang pengecekan pakai jenisUjian)
  const tkaSoalList = [
    "mattka",
    "indtka",
    "engtka",
    "bindolanjut",
    "binglanjut",
    "fisika",
    "kimia",
    "biologi",
    "ekonomi",
    "geografi",
    "sosiologi",
    "sejarah",
    "jepang",
  ];

  // Tentukan href final
  let href = "#"; // default fallback

  if (sisawaktu > 0) {
    if (jenisUjian === "diagnostik") {
      href = `/layanan/diagnostik/diagnostiktes?link=${linkKu}`;
    } else if (jenisUjian === "tka") {
      href = `/form/tkasupa?link=${linkKu}`;
    } else if (jenisUjian === "snbt") {
      href = `/form/snbtsupaplus?link=${linkKu}`;
    } else {
      // fallback: kalau tidak jelas
      href = `/form/snbtsupaplus?link=${linkKu}`;
    }
  }

  return (
    <>
      {sisawaktu > 0 ? (
        <div className="w-full grid m-auto p-2 bg-red-900">
          <Link href={href}>
            <p className="text-center text-gray-100 text-xs md:text-lg">
              {nameKu}, yuk lanjutkan pengerjaanmu.
            </p>
          </Link>
        </div>
      ) : (
        <div className="w-full grid m-auto p-4 bg-gradient-to-b from-purple-900 via-gray-900 to-purple-900">
          <CountdownTimer targetDate={targetDate} />
        </div>
      )}
    </>
  );
}
