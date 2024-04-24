import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Loader from "./Loader";
import Image from "next/image";

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID_RATING;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_RATING3;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const AllRatingTentor = () => {
  const { data: session } = useSession();
  const [dataRows3, setDataRows3] = useState([]);
  const [pengajarData, setPengajarData] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk menampilkan loader

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  const ambilRatingTentor = async () => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    await doc.loadInfo();
    const sheet3 = doc.sheetsById[SHEET_ID3];
    const rows3 = await sheet3.getRows(); //data rating

    // Mengumpulkan semua data dari rows3 ke dalam sebuah array
    setLoading(true);
    const allRows3Data = [];
    rows3.forEach((row) => {
      allRows3Data.push(row);
    });
    // Set array data ke state
    setDataRows3(allRows3Data);
    setLoading(false); // Set loading menjadi false setelah data diperbarui
  };
  useEffect(() => {
    ambilRatingTentor();
  }, []); // Gunakan array kosong agar useEffect hanya dijalankan sekali saat komponen pertama kali dirender
  useEffect(() => {
    // Fungsi untuk mengelompokkan data dan menghitung rata-rata rating
    const hitungRataRataRating = (data) => {
      const pengajarRating = {};
      const pengajarCount = {};

      data.forEach((item) => {
        const rating = parseFloat(item.rating); // Mengubah string menjadi angka
        if (!pengajarRating[item.rating_pengajar]) {
          pengajarRating[item.rating_pengajar] = 0;
          pengajarCount[item.rating_pengajar] = 0;
        }
        pengajarRating[item.rating_pengajar] += rating;
        pengajarCount[item.rating_pengajar]++;
      });

      const result = {};
      Object.keys(pengajarRating).forEach((key) => {
        result[key] = pengajarRating[key] / pengajarCount[key];
      });

      return result;
    };

    // Hitung rata-rata rating
    const rataRataRating = hitungRataRataRating(dataRows3);

    // Ubah hasil perhitungan menjadi array untuk kemudian ditampilkan
    const pengajarList = Object.keys(rataRataRating).map((rating_pengajar) => ({
      rating_pengajar: rating_pengajar,
      rataRating: rataRataRating[rating_pengajar],
    }));
    // Mengurutkan pengajar berdasarkan rating tertinggi
    pengajarList.sort((a, b) => b.rataRating - a.rataRating);

    // Set data pengajar ke state
    setPengajarData(pengajarList);
  }, [pengajarData]);
  return (
    <div className="max-w-2xl grid grid-cols-1 m-auto mb-4 p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="border-l-4">
          {pengajarData.map((pengajar, index) => (
            <div key={index}>
              <div
                className="bg-blue-500 relative"
                style={{
                  width: `${(pengajar.rataRating / 5) * 100}%`,
                  height: "25px",
                  marginTop: "5px",
                }}
              >
                <div className="flex items-center w-full space-x-2 absolute inset-y-0 left-2">
                  <Image
                    src={`/image/tentor/${pengajar.rating_pengajar}.png`}
                    width={15}
                    height={15}
                    alt="No Image"
                    className="rounded-full"
                    priority
                  />
                  <div className="text-xs">
                    {pengajar.rating_pengajar} ({pengajar.rataRating.toFixed(2)}
                    <span
                      style={{
                        color: "gold",
                      }}
                    >
                      ★
                    </span>
                    )
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRatingTentor;
