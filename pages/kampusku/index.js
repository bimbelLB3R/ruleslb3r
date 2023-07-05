import Layout from "../../components/Layout";
import { getBlogsData } from "../../utils/blogsApi";
import { getKampusesData } from "../../utils/tambahProdiApi";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import ChartDayaTampung from "../../components/ChartDayaTampung";
import ChartPeminat from "../../components/ChartPeminat";
import ChartKeketatan from "../../components/ChartKeketatan";
import Head from "next/head";
import { getDefinisiProdi } from "../../utils/kampusApaItuProdiApi";
import { Transition } from "@headlessui/react";

// meminta data ke server /api
export async function getStaticProps() {
  const data = getKampusesData();
  const dataBlogs = getBlogsData();
  const definisiProdi = getDefinisiProdi();
  return {
    props: {
      allPost: dataBlogs.posts,
      allKampus: data.kampuses,
      definisiProdi: definisiProdi.data,
    },
  };
}

export default function Kampus({ allKampus, allPost, definisiProdi }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef(null);
  useEffect(() => {
    // setShowNavbar(true);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // const windowHeight = window.innerHeight;

      if (scrollPosition > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [pilihanKampus, setPilihanKampus] = useState([]);
  const [pilihanProdi, setPilihanProdi] = useState([]);
  const [disableprodi, setDisableProdi] = useState(false);

  const AllNamaKampus = allKampus.map((item, index) => item.nama_kampus);

  let namaProdi = "";
  const cariProdiDariKode = allKampus.forEach((item, index) =>
    item.prodi.forEach((item2) => {
      if (item2.kode_prodi === pilihanProdi) {
        namaProdi = item2.nama_prodi;
      }
    })
  );
  const kampusPunyaPilihanProdi = allKampus.filter((kampus) => {
    return kampus.prodi.some((prodi) => prodi.nama_prodi === namaProdi);
  });
  const filteredKampus = kampusPunyaPilihanProdi.filter(
    (item) => item.nama_kampus !== pilihanKampus
  );

  const defProdi = definisiProdi.filter(
    (item) => item.nama_prodi === namaProdi
  );

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

  console.log(defProdi);

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
        <Transition
          show={showNavbar}
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Navbar
            ref={navbarRef}
            logoUrl="/image/logolb3r.png"
            logoAlt="Logo"
            allPost={allPost}
          />
        </Transition>
        <div className="flex items-center justify-center  font-roboto">
          <div className="max-w-sm md:max-w-3xl ">
            <form className="text-gray-600">
              <div className="bg-[url('/og-images/testOg.png')] p-4 bg-no-repeat bg-cover ">
                <h1 className="mb-4 text-xl font-bold text-orange-900 text-center">
                  Cek Keketatan Prodi
                </h1>
                <div className="mb-2 text-orange-900">
                  <div className="flex justify-center ">
                    <div className="relative  ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 absolute top-1/2 left-2  transform  -translate-y-1/2"
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
                      className="w-full md:w-1/2 border-orange-600 pl-10 bg-gray-100/70 "
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
                </div>

                <div className="mb-4 text-orange-900">
                  <div className="flex justify-center ">
                    <div className="relative  ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 absolute top-1/2 left-2 transform  -translate-y-1/2"
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
                      className="w-full md:w-1/2 border-orange-600 pl-10 bg-gray-100/70"
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
                </div>
              </div>

              <div className="md:flex md:space-x-4 p-6">
                <div className="md:w-1/2">
                  <div className="mb-4 shadow-md p-3 ">
                    <p className="font-semibold text-orange-400">
                      Daya Tampung
                    </p>
                    {pilihanProdi.length === 0 ? (
                      <p className="text-xs text-red-900 italic">
                        Tidak ada data
                      </p>
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
                  <div className="mb-4 shadow-md p-3">
                    <p className="font-semibold text-orange-400">Peminat</p>
                    {pilihanProdi.length === 0 ? (
                      <p className="text-xs text-red-900 italic">
                        Tidak ada data
                      </p>
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
                  <div className="mb-4 shadow-md p-3">
                    <p className="font-semibold text-orange-400">Keketatan</p>
                    {pilihanProdi.length === 0 ? (
                      <p className="text-xs text-red-900 italic">
                        Tidak ada data
                      </p>
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
                </div>
                <div className="md:w-1/2">
                  <div className="shadow-md p-3 mb-10">
                    <p className="font-semibold text-orange-400">Kampus Lain</p>

                    {pilihanProdi.length === 0 ||
                    filteredKampus.length === 0 ? (
                      <div>
                        <p className="text-xs text-red-900 italic">
                          Tidak ada data
                        </p>
                        <p className="text-xs text-red-900 italic mt-4 mb-4">
                          Catatan : Tiap kampus memiliki penamaan prodi yang
                          berbeda-beda sehingga tidak semua kampus dengan prodi
                          yang kamu pilih bisa muncul.
                        </p>
                      </div>
                    ) : (
                      <div className="text-sm p-2">
                        <p className="text-sm mb-1">
                          Ternyata prodi pilihanmu ada juga di kampus di bawah
                          ini loh ...
                        </p>
                        {filteredKampus.map((item, index) => (
                          <div key={index}>
                            <p className="lowercase">#{item.nama_kampus}</p>
                          </div>
                        ))}
                        <p className="text-xs text-red-900 italic mt-4 mb-4">
                          Catatan : Tiap kampus memiliki penamaan prodi yang
                          berbeda-beda sehingga tidak semua kampus dengan prodi
                          yang kamu pilih bisa muncul.
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className={`${
                      defProdi.length === 0
                        ? ""
                        : "shadow-md p-3 text-sm  relative"
                    }`}
                  >
                    {defProdi.length === 0 ? (
                      ""
                    ) : (
                      <div className="absolute bg-orange-900/70  transform   -translate-y-1/2">
                        <p className="text-slate-50 p-2 ">
                          APA ITU PRODI {namaProdi}
                        </p>
                      </div>
                    )}
                    {pilihanProdi.length !== 0 ? (
                      <div className="pt-6 ">
                        {defProdi.map((item, index) => (
                          <p key={index} className="bg-orange-400/20 p-2">
                            {item.definisi}
                            <span className="italic">({item.sumber})</span>
                          </p>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
