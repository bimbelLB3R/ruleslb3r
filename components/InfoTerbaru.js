import Link from "next/link";
import { useState, useEffect } from "react";

const InfoTerbaru = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true); // Munculkan modal saat pertama kali halaman dimuat
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return null; // Jika showModal adalah false, maka tidak perlu menampilkan modal
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 opacity-95 z-40">
      <div className="absolute inset-0 flex items-center justify-center ">
        <div>
          <div className="flex justify-end">
            <button onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </button>
          </div>

          <div className="bg-white rounded-md w-[300px] p-2">
            <div className="flex items-center space-x-3 bg-orange-600 text-slate-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-info-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <p className="font-bold">Informasi Lomba</p>
            </div>
            <div className="mt-4 text-center">
              <p>
                Adik-adik yang ingin mengikuti lomba KMC (Kompetisi Matematika
                Ceria 2) bisa mendaftar melalui link dibawah ini
              </p>
              <div className="flex items-center space-x-3 justify-center">
                <Link href="/layanan">
                  <p className="bg-gray-800 px-2 py-4 text-slate-50 m-3 rounded">
                    Daftar Lomba
                  </p>
                </Link>
              </div>
              {/* Konten modal lainnya */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTerbaru;
