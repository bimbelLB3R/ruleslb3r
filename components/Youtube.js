import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Youtube({ videoId, bab, allMath, theme, allEnglish }) {
  const [other, setOther] = useState([]);
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    if (bab) {
      setOther(allMath.filter((item) => item.bab === bab));
    } else if (theme) {
      setOther(allEnglish.filter((item) => item.theme === theme));
    }
  }, [bab, theme, allMath, allEnglish]);
  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <iframe
          className="w-[300px] sm:w-[560px] h-[169px] sm:h-[315px] object-cover"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <p className="font-bold flex justify-center">Materi Lainnya</p>

        <div>
          {other.map((item, index) => (
            <div key={index}>
              <Link
                href={
                  bab
                    ? {
                        pathname: `/math/${item.slug}`,
                        query: { bab: item.bab, id: item.id },
                      }
                    : {
                        pathname: `/pare/${item.slug}`,
                        query: { theme: item.theme, id: item.id },
                      }
                }
                className="flex items-center space-x-2 border-b-2 m-3"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={
                      item.id == id
                        ? "h-6 w-6 text-red-900 font-semibold"
                        : "h-6 w-6"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                </div>
                <div className={item.id == id ? " text-red-900" : ""}>
                  {theme ? item.description : item.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-10 flex justify-center p-2">
        <Link
          href={bab ? "/math" : "/pare"}
          className="bg-blue-600 p-2 text-gray-50 hover:bg-blue-400"
        >
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}
