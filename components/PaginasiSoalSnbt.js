import { useEffect, useRef } from "react";

export default function Paginationsnbt({ totalPages, currentPage, setCurrentPage, isChecked, selectedValues,allData }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef([]);
  const dataSaatIni=allData.map((item)=>item.typeOpsi);
  // console.log(dataSaatIni);
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
    <div className="flex flex-row overflow-auto w-1/2 mx-auto" ref={containerRef}>
      {Array.from(Array(totalPages).keys()).map((page) => (
        <button
          key={page}
          ref={(el) => (buttonRefs.current[page] = el)}
          className={`${
            isChecked[page + 1]
              ? " bg-gray-800 rounded-none p-3 text-red-600"
              : "bg-gray-800 rounded-none p-3 text-gray-50"
          }`}
          onClick={() => {
            setCurrentPage(page + 1);
            localStorage.setItem("currentPage", page + 1);
          }}
        >
        <p
          className={`${currentPage === page + 1 
            ? isChecked[page + 1] 
              ? "font-bold bg-red-600 text-gray-50" 
              : "font-bold bg-green-600 text-gray-50" 
            : "text-gray-50"} 
            p-1 rounded-full w-[2rem] h-[2rem] flex items-center justify-center`}
        >
            {/* {dataSaatIni[0] === "pilgan" ? (
              <>{page + 1}{selectedValues[`group${page}`]}</>
            ) : (
              <>{page + 1}</>
            )} */}
            {/* tampilkan nomor halaman saja */}
            {page + 1}

        </p>
        </button>
      ))}
    </div>
  );
}
