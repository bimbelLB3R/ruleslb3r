import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import CountdownTimer from "./CountDownTimer";
import { getActiveSesi } from "../utils/lsSession";

dayjs.extend(duration);

export default function WarningSnbt() {
  const targetDate = "2026-04-21T23:59:59";
  const [nameKu, setNameKu]       = useState("");
  const [href, setHref]           = useState("#");
  const [sisawaktu, setSisaWaktu] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sesi = getActiveSesi(); // cek snbt__ dan tka__ sekaligus

    if (!sesi) {
      setSisaWaktu(0);
      return;
    }

    setNameKu(localStorage.getItem("name") || "");
    setSisaWaktu(sesi.remaining);

    // Tentukan href dari slug aktif — tidak perlu cek jenisUjian lagi
    setHref(`/form/tolb3r?link=${sesi.link}`);
  }, []);

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