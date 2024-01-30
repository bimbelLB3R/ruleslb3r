import Link from "next/link";
import { useEffect, useState } from "react";

export default function WarningSnbt() {
  const [nameKu, setNameKu] = useState("");
  const [linkKu, setLinkku] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const linkSoal = localStorage.getItem("link");
    setNameKu(storedName);
    setLinkku(linkSoal);
  }, []);

  //   console.log(storedName);
  return (
    <>
      {nameKu ? (
        <div className="w-full grid m-auto p-2 bg-red-900">
          <Link href={`http://www.bimbellb3r.com/form/snbt?link=${linkKu}`}>
            <p className="text-center text-gray-100 text-xs md:text-lg">
              {nameKu}, kamu masih aktif mengerjakan soal TO SNBT klik disini.
            </p>
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
