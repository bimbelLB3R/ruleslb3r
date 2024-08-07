import Image from "next/image";
import { useState, useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Head from "next/head";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import Link from "next/link";

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID_RATING;
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID_RATING1;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const LiveJadwal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataJadwal, setDataJadwal] = useState([]);

  const ambilJadwal = async () => {
    try {
      setIsLoading(true);
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });

      await doc.loadInfo(); // Make sure the sheet is loaded
      const sheet1 = doc.sheetsById[SHEET_ID1]; // Get the specific sheet
      const rows = await sheet1.getRows(); // Fetch the rows

      const today = new Date();
      const tanggalJadwalSiswa = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`; // Format today's date
      const jadwalHariIni = rows.filter((row) => row.tanggal_jadwal === tanggalJadwalSiswa);

      setDataJadwal(jadwalHariIni);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ambilJadwal();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Live Jadwal | Bimbel LB3R</title>
        <meta name="description" content="Jadwal Live Bimbel LB3R Hari Ini" key="desc" />
        <link rel="icon" type="image/png" sizes="16x16" href="/image/logolb3r.png" />
      </Head>
      <div className="mt-20">
        <div>
          <h2 className="text-center font-bold uppercase">Jadwal Hari Ini</h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-screen m-auto">
              <Loader />
            </div>
          ) : (
            <div className="mb-20">
              {dataJadwal.length > 0 ? (
                <div>
                  {dataJadwal.map((daJal) => (
                    <div key={daJal.id_jadwal}>
                      <div className="flex items-center justify-start space-x-3 border-b-2 border-gray-300 p-2 max-w-[300px] md:max-w-xl m-auto">
                        <div>
                          <Link href={`https://www.bimbellb3r.com/image/tentor/${daJal.pengajar_jadwal}.png`} className="flex items-center justify-center">
                            <Image
                              src={`/image/tentor/${daJal.pengajar_jadwal.length>0?daJal.pengajar_jadwal:'iconlb3r'}.png`}
                              width={50}
                              height={50}
                              alt="No Image"
                              className="rounded-full"
                              priority
                            />
                          </Link>
                          
                        </div>
                        <div>
                            <p>{daJal.kelas_jadwal}</p>
                            <p className="text-xs text-gray-400">
                            diajar oleh : {daJal.pengajar_jadwal}
                          </p>
                            <p className="text-xs text-gray-400">
                            Masuk pukul : {daJal.mulai_jadwal} WITA
                          </p>
                            <p className="text-xs text-gray-400 uppercase">
                            Ruang Belajar : Ruang {daJal.ruang} 
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center p-3">Jadwal belum tersedia</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LiveJadwal;
