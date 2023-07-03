import Layout from "../../components/Layout";
import { getBlogsData } from "../../utils/blogsApi";
import { getKampusesData } from "../../utils/tambahProdiApi";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ChartDayaTampung from "../../components/ChartDayaTampung";
import ChartPeminat from "../../components/ChartPeminat";
import ChartKeketatan from "../../components/ChartKeketatan";
import Head from "next/head";

// meminta data ke server /api
export async function getStaticProps() {
  const data = getKampusesData();
  const dataBlogs = getBlogsData();
  return {
    props: {
      allPost: dataBlogs.posts,
      allKampus: data.kampuses,
    },
  };
}

export default function Kampus({ allKampus, allPost }) {
  const [pilihanKampus, setPilihanKampus] = useState([]);
  const [pilihanProdi, setPilihanProdi] = useState([]);
  const [disableprodi, setDisableProdi] = useState(false);

  const AllNamaKampus = allKampus.map((item, index) => item.nama_kampus);

  const dataKampus = allKampus.find(
    (item) => item.nama_kampus == pilihanKampus
  ); //identifikasi nama kampus

  const prodi = dataKampus?.prodi || [];
  const DataProdiYangDiKlik = prodi.find(
    (item) => item.kode_prodi == pilihanProdi
  );
  const dataTahun = DataProdiYangDiKlik?.tahun || [];
  const dataDayaTampung = DataProdiYangDiKlik?.daya_tampung || [];
  const dataPeminat = DataProdiYangDiKlik?.peminat || [];
  const dataKeketatan = dataDayaTampung.map((item, index) =>
    ((item / dataPeminat[index]) * 100).toFixed(3)
  );

  const chartDataDayaTampung = {
    labels: dataTahun,
    values: dataDayaTampung,
  };
  const chartDataPeminat = {
    labels: dataTahun,
    values: dataPeminat,
  };
  const chartDatakeketatan = {
    labels: dataTahun,
    values: dataKeketatan,
  };

  // console.log(dataKeketatan);

  const handleKampus = (e) => {
    setPilihanKampus(e.target.value);
    setPilihanProdi("");
    setDisableProdi(false);
  };
  const handleProdi = (e) => {
    setPilihanProdi(e.target.value);
    // setDisableProdi(true);
  };

  return (
    <>
      <Head>
        <title>Cek Keketatan Prodi SNBT</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Cek daya tampung, jumlah peminat dan keketatan prodi jalur SNBT"
          key="desc"
        />
      </Head>
      <Layout>
        <Navbar
          logoUrl="/image/logolb3r.png"
          logoAlt="Logo"
          allPost={allPost}
        />
        <div className="flex items-center justify-center mt-20">
          <div>
            <h1 className="mb-4 text-xl font-bold text-orange-900/50">
              Cek Keketatan Prodi
            </h1>
            <form className="text-gray-600">
              <div className="mb-2 relative">
                <div className="absolute  top-1/2 left-1  transform  -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                    />
                  </svg>
                </div>
                <select
                  name="pilihanKampus"
                  className="w-[300px] border-none pl-8 bg-transparent"
                  onChange={handleKampus}
                >
                  <option value="">Pilih Kampus</option>
                  {AllNamaKampus.map((item, index) => (
                    <option
                      key={index}
                      value={item}
                      className="hover:bg-gray-600 p-2"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 relative">
                <div className="absolute  top-1/2 left-1  transform  -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <select
                  name="pilihanProdi"
                  className="w-[300px] border-none pl-8 bg-transparent"
                  onChange={handleProdi}
                  // disabled={disableprodi}
                >
                  <option value="">Pilih Prodi</option>
                  {prodi.map((item, index) => (
                    <option
                      key={index}
                      value={item.kode_prodi}
                      className="hover:bg-gray-600 p-2"
                    >
                      {item.nama_prodi}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 shadow-md">
                <p className="font-semibold text-orange-400">Daya Tampung</p>
                {pilihanProdi.length === 0 ? (
                  <p className="text-xs text-red-900 italic">Tidak ada data</p>
                ) : (
                  <div>
                    <ChartDayaTampung data={chartDataDayaTampung} />
                    {/* <div className="flex space-x-2">
                    {dataDayaTampung.map((item, index) => (
                      <div key={index} className="bg-gray-400 p-1 text-xs">
                        {item}
                      </div>
                    ))}
                  </div> */}
                  </div>
                )}
              </div>
              <div className="mb-4 shadow-md">
                <p className="font-semibold text-orange-400">Peminat</p>
                {pilihanProdi.length === 0 ? (
                  <p className="text-xs text-red-900 italic">Tidak ada data</p>
                ) : (
                  <div>
                    <ChartPeminat data={chartDataPeminat} />
                    {/* <div className="flex space-x-2">
                    {dataPeminat.map((item, index) => (
                      <div key={index} className="bg-gray-400 p-1 text-xs">
                        {item}
                      </div>
                    ))}
                  </div> */}
                  </div>
                )}
              </div>
              <div className="shadow-md">
                <p className="font-semibold text-orange-400">Keketatan</p>
                {pilihanProdi.length === 0 ? (
                  <p className="text-xs text-red-900 italic">Tidak ada data</p>
                ) : (
                  <div>
                    <ChartKeketatan data={chartDatakeketatan} />
                    {/* <div className="flex space-x-2">
                    {dataDayaTampung.map((item, index) => (
                      <div key={index} className="bg-gray-400 p-1 text-xs">
                        {(dataPeminat[index] / item).toFixed(3)}
                      </div>
                    ))}
                  </div> */}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
