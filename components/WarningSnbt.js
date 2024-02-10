import Link from "next/link";
import { useEffect, useState } from "react";

export default function WarningSnbt() {
  const [nameKu, setNameKu] = useState("");
  const [linkKu, setLinkku] = useState("");
  const [sisawaktu, setSisaWaktu] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const linkSoal = localStorage.getItem("link");
    const sisawaktu = localStorage.getItem("timeLeft");
    setNameKu(storedName);
    setLinkku(linkSoal);
    setSisaWaktu(sisawaktu);
  }, []);

  //   console.log(storedName);
  return (
    <>
      {sisawaktu ? (
        <div className="w-full grid m-auto p-2 bg-red-900">
          <Link href={`https://www.bimbellb3r.com/form/snbt?link=${linkKu}`}>
            <p className="text-center text-gray-100 text-xs md:text-lg">
              {nameKu}, kamu masih punya sisa waktu mengerjakan soal TO SNBT
              klik disini.
            </p>
          </Link>
        </div>
      ) : (
        <div className="w-full grid m-auto p-4 bg-gradient-to-b from-purple-900 via-gray-900 to-purple-900">
          <Link href={"/form/newmember"}>
            <p className="text-center text-yellow-400 underline text-xs md:text-lg">
              Yuk..Ikuti Try Out SNBT 2024 bersama LB3R ! GRATIS LOH....Klik di
              sini untuk daftar ya!!
            </p>
          </Link>
        </div>
      )}
    </>
  );
}
