import { useEffect, useRef } from "react";

export default function Paginationsnbt({ totalPages, currentPage, setCurrentPage, isChecked, selectedValues }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    if (buttonRefs.current[currentPage - 1]) {
      buttonRefs.current[currentPage - 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center", // Posisikan tombol ke tengah
      });
    }
  }, [currentPage]);

  return (
    <div className="flex flex-row overflow-auto w-1/2 sm:w-full mx-auto" ref={containerRef}>
      {Array.from(Array(totalPages).keys()).map((page) => (
        <button
          key={page}
          ref={(el) => (buttonRefs.current[page] = el)}
          className={`${
            isChecked[page + 1]
              ? "bg-yellow-400 p-3"
              : "bg-gray-800 rounded-none p-3 text-gray-50"
          }`}
          onClick={() => {
            setCurrentPage(page + 1);
            localStorage.setItem("currentPage", page + 1);
          }}
        >
          <p className={`${currentPage === page + 1 ? "font-bold bg-green-600 p-1 rounded-full w-[2rem] h-[2rem]" : "text-gray-50"} flex items-center justify-center`}>
            {page + 1}{selectedValues[`group${page}`]}
          </p>
        </button>
      ))}
    </div>
  );
}
