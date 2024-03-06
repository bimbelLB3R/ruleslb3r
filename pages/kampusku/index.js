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
import Wa from "../../components/Wa";
import Script from "next/script";
// import InfoTerbaru from "../../components/InfoTerbaru";

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

// Fungsi untuk menghitung rata-rata peminat dan mengabaikan nilai 0
function calculateAveragePeminat(peminatArray) {
  const filteredPeminat = peminatArray
    .filter((peminat) => peminat !== 0)
    .slice(-5);
  if (filteredPeminat.length === 0) {
    return 0; // Mengembalikan 0 jika tidak ada nilai selain 0
  }
  const sum = filteredPeminat.reduce((acc, val) => acc + val, 0);
  return sum / filteredPeminat.length;
}

export default function Kampus({ allKampus, allPost, definisiProdi }) {
  const [ranking, setRanking] = useState();
  const [rataMinat, setRataPeminat] = useState();
  const [kategori, setKategori] = useState();

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
  const [disablekategori, setDisableKategori] = useState(false);
  // console.log(pilihanKampus);

  // const AllNamaKampus = allKampus.map((item, index) => item.nama_kampus);
  const AllNamaKampus = allKampus.filter(
    (item, index) => item.kategori == kategori
  );
  // console.log(AllNamaKampus);

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
  // console.log(namaProdi);
  const filteredKampus = kampusPunyaPilihanProdi.filter(
    (item) => item.nama_kampus !== pilihanKampus
  );

  const defProdi = definisiProdi.filter(
    (item) => item.nama_prodi === namaProdi
  );

  const dataKampus = allKampus.find(
    (item) => item.nama_kampus == pilihanKampus
  ); //identifikasi kampus
  // console.log(allKampus);
  const prodi = dataKampus?.prodi || [];
  const jmlProdi = prodi.length;
  const DataProdiYangDiKlik = prodi.find(
    (item) => item.kode_prodi == pilihanProdi
  );
  // console.log(pilihanKampus);
  const dataTahun = (DataProdiYangDiKlik?.tahun || []).slice(-6);
  const dataDayaTampung = (DataProdiYangDiKlik?.daya_tampung || []).slice(-6);
  const dataPeminat = (DataProdiYangDiKlik?.peminat || []).slice(-6);
  // console.log(dataPeminat);
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

  // console.log(defProdi);
  const handleKategori = (e) => {
    setKategori(e.target.value);
  };

  const handleKampus = (e) => {
    setPilihanKampus(e.target.value);
    setPilihanProdi("");
    setDisableProdi(false);
  };
  const handleProdi = (e) => {
    setPilihanProdi(e.target.value);
    // setDisableProdi(true);
    setDisableKategori(true);
  };

  // Menghitung rata-rata peminat untuk setiap nama_prodi
  const averagePeminatData = prodi.map((item) => ({
    nama_prodi: item.nama_prodi,
    rata_rata_peminat: calculateAveragePeminat(item.peminat),
  }));

  // Mengurutkan data berdasarkan rata-rata peminat dari yang paling besar ke yang paling kecil
  averagePeminatData.sort((a, b) => b.rata_rata_peminat - a.rata_rata_peminat);
  // console.log(averagePeminatData);
  // Mencari peringkat nama_prodi tertentu
  const targetProdiNama = namaProdi; // Ganti dengan nama_prodi yang ingin Anda cari
  // console.log(targetProdiNama);
  const targetProdi = averagePeminatData.find(
    (prodi) => prodi.nama_prodi === targetProdiNama
  );
  useEffect(() => {
    if (targetProdi) {
      const ranking = averagePeminatData.indexOf(targetProdi) + 1;
      setRataPeminat(targetProdi.rata_rata_peminat);
      setRanking(ranking);
      // console.log(ranking);
    } else {
      console.log(``);
    }
  }, [targetProdi]);

  // Membuat kategori popularitas prodi
  // Jml total prodi=jmlProdi
  // Peringkat prodi=ranking
  // Menghitung jumlah prodi dalam setiap kategori (dibagi menjadi 5 kategori)
  const prodiPerKategori = Math.floor(jmlProdi / 5);
  // console.log(jmlProdi);
  // console.log(ranking);
  // console.log(rataMinat);
  // console.log(filteredKampus);
  // console.log(defProdi);
  // Menentukan batas peringkat untuk setiap kategori
  const batasSangatPopuler = prodiPerKategori; // Misalnya, 13 prodi pertama
  const batasPopuler = 2 * prodiPerKategori; // Misalnya, prodi ke-14 hingga ke-26
  const batasCukupPopuler = 3 * prodiPerKategori; // Misalnya, prodi ke-27 hingga ke-39
  const batasTidakPopuler = 4 * prodiPerKategori; // Misalnya, prodi ke-40 hingga ke-52

  // Klasifikasi prodi ke dalam kategori
  function klasifikasikanProdi(ranking) {
    if (ranking <= batasSangatPopuler) {
      return "Sangat Populer";
    } else if (ranking <= batasPopuler) {
      return "Populer";
    } else if (ranking <= batasCukupPopuler) {
      return "Cukup Populer";
    } else if (ranking <= batasTidakPopuler) {
      return "Tidak Populer";
    } else {
      return "Sangat Tidak Populer";
    }
  }

  // Menggunakan contoh peringkat prodi kedokteran
  const kategoriProdi = klasifikasikanProdi(ranking);

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
        <Wa />
        <div className="flex items-center justify-center  font-roboto">
          <div className="max-w-sm md:max-w-3xl ">
            <form className="text-gray-600">
              <div className="bg-[url('/og-images/testOg.png')] p-4 bg-no-repeat bg-cover ">
                <h1 className="mb-4 text-xl font-bold text-orange-900 text-center">
                  Cek Keketatan Prodi SNBT
                </h1>
                <div
                  className={`text-orange-900 ${
                    disablekategori ? "mb-1" : "mb-2"
                  }`}
                >
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
                      name="pilihanKategori"
                      className={`w-full md:w-1/2 border-orange-600 pl-10 ${
                        disablekategori ? "bg-gray-400" : "bg-gray-100/70"
                      }`}
                      onChange={handleKategori}
                      disabled={disablekategori}
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="akademik">PTN Akademik</option>
                      <option value="vokasi">PTN Vokasi</option>
                      <option value="kin">PT KIN</option>
                    </select>
                  </div>
                </div>
                {disablekategori ? (
                  <p className="text-xs text-gray-50 text-center mb-2 animate-bounce">
                    (refresh halaman untuk memilih kategori lain)
                  </p>
                ) : (
                  ""
                )}
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
                          value={item.nama_kampus}
                          className="hover:bg-gray-600 p-2"
                        >
                          {item.nama_kampus}
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
                      {prodi
                        .sort((a, b) =>
                          a.nama_prodi.localeCompare(b.nama_prodi)
                        ) // Mengurutkan berdasarkan abjad
                        .map((item, index) => (
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
                    <p className="font-semibold text-orange-400">
                      Tren Peminat
                    </p>
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
                  <div className="shadow-md p-3 mb-4">
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
                  <div className="shadow-md p-3 mb-4">
                    <p className="font-semibold text-orange-400">
                      Tingkat Popularitas
                    </p>

                    {!ranking ? (
                      <div>
                        <p className="text-xs text-red-900 italic">
                          Tidak ada data
                        </p>
                      </div>
                    ) : (
                      <div className="text-sm p-2">
                        <p className="text-sm mb-1">
                          Prodi yang kamu pilih menduduki peringkat{" "}
                          <span className="font-bold">
                            {ranking} dari {jmlProdi} prodi
                          </span>{" "}
                          yang ada dikampus ini dengan rata-rata jumlah
                          peminatnya adalah{" "}
                          <span className="font-bold">
                            {Math.ceil(rataMinat)} orang.{" "}
                          </span>
                          Prodi pilihanmu termasuk{" "}
                          <span className="uppercase font-bold text-green-900">
                            {kategoriProdi}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div
                    className={`${
                      pilihanProdi.length === 0 || defProdi.length === 0
                        ? ""
                        : "shadow-md p-3 text-sm  relative"
                    }`}
                  >
                    {pilihanProdi.length !== 0 ? (
                      <div className="pt-6 ">
                        {defProdi.map((item, index) => (
                          <div key={index} className=" p-2 relative">
                            <div className="absolute  transform   -translate-y-1/2 bg-orange-400/20">
                              <div className="p-2 flex items-center">
                                <div className="">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    fill="currentColor"
                                    className="bi bi-question-diamond-fill text-orange-900/70"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
                                  </svg>
                                </div>
                                <p className=" p-2 text-orange-900/70 font-bold">
                                  APA ITU PRODI {namaProdi}{" "}
                                </p>
                              </div>
                            </div>
                            <div className="mt-10">
                              <p>
                                {item.definisi}
                                <span className="italic">({item.sumber})</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    className={`${
                      pilihanProdi.length === 0 || defProdi.length === 0
                        ? ""
                        : "shadow-md p-3 text-sm  relative"
                    }`}
                  >
                    {pilihanProdi.length !== 0 ? (
                      <div className="pt-6 mt-4">
                        {defProdi.map((item, index) => (
                          <div key={index} className=" p-2 relative ">
                            <div className="absolute  transform   -translate-y-1/2 bg-blue-400/20">
                              <div className="p-2 flex items-center">
                                <div className="">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    fill="currentColor"
                                    className="bi bi-book-half text-blue-900/70"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                  </svg>
                                </div>
                                <p className=" p-2 text-blue-900/70 font-bold">
                                  BELAJAR APA AJA DI PRODI {namaProdi}{" "}
                                </p>
                              </div>
                            </div>

                            <div className="mt-[60px] flex flex-wrap">
                              {item.mata_kuliah
                                ?.sort((a, b) => a.localeCompare(b))
                                .map((item2, index) => (
                                  <div
                                    key={index}
                                    className="bg-blue-400/10 p-1 m-1"
                                  >
                                    <p>{item2}</p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    className={`${
                      pilihanProdi.length === 0 || defProdi.length === 0
                        ? ""
                        : "shadow-md p-3 text-sm  relative"
                    }`}
                  >
                    {pilihanProdi.length !== 0 ? (
                      <div className="pt-6 mt-4">
                        {defProdi.map((item, index) => (
                          <div key={index} className=" p-2 relative">
                            <div className="absolute  transform   -translate-y-1/2 bg-yellow-400/20">
                              <div className="p-2 flex items-center">
                                <div className="">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    fill="currentColor"
                                    className="bi bi-person-workspace text-yellow-900/70"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                    <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
                                  </svg>
                                </div>
                                <p className=" p-2 text-yellow-900/70 font-bold">
                                  PELUANG KARIR PRODI {namaProdi}{" "}
                                </p>
                              </div>
                            </div>

                            <div className="mt-[60px]">
                              {item.prospek_kerja
                                ?.sort((a, b) => a.localeCompare(b))
                                .map((item2, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start space-x-2"
                                  >
                                    <div>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="currentColor"
                                        className="bi bi-check2-square"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                      </svg>
                                    </div>
                                    <p>{item2}</p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`${
                      pilihanProdi.length === 0 || defProdi.length === 0
                        ? ""
                        : "shadow-md p-3 text-sm  relative"
                    }`}
                  >
                    {pilihanProdi.length !== 0 ? (
                      <div className="pt-6 mt-4">
                        {defProdi.map((item, index) => (
                          <div key={index} className=" p-2 relative">
                            <div className="absolute  transform   -translate-y-1/2 bg-green-400/20">
                              <div className="p-2 flex items-center">
                                <div className="">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    fill="currentColor"
                                    className="bi bi-universal-access-circle text-green-900/70"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143Zm-4.668 1.47 3.24.316v2.5l-.323 4.585A.383.383 0 0 0 7 13.14l.826-4.017c.045-.18.301-.18.346 0L9 13.139a.383.383 0 0 0 .752-.125L9.43 8.43v-2.5l3.239-.316a.38.38 0 0 0-.047-.756H3.379a.38.38 0 0 0-.047.756Z" />
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Z" />
                                  </svg>
                                </div>
                                <p className="p-2 text-green-900/70 font-bold">
                                  STRENGTH TYPOLOGY PRODI {namaProdi}{" "}
                                </p>
                              </div>
                            </div>

                            <div className="mt-[60px]">
                              {item.st30?.map((item2, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  {item2.merah?.map((item3, index) => (
                                    <div
                                      key={index}
                                      className="mb-2 border-2 mt-2"
                                    >
                                      <p className=" p-1 bg-red-600/50 font-roboto text-sm ">
                                        {item3}
                                      </p>
                                    </div>
                                  ))}
                                  {item2.kuning?.map((item3, index) => (
                                    <div key={index} className="mb-2 border-2">
                                      <p className=" p-1 bg-yellow-600/50 font-roboto text-sm">
                                        {item3}
                                      </p>
                                    </div>
                                  ))}
                                  {item2.putih?.map((item3, index) => (
                                    <div key={index} className="mb-2 border-2">
                                      <p className=" p-1 bg-gray-100/50 font-roboto text-sm">
                                        {item3}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                            <div>
                              <a
                                href="https://temubakat.com/id/index.php/main/disp/tes"
                                target="_blank"
                                className="bg-green-500 rounded px-4 py-2 text-gray-100 flex items-center justify-center space-x-2"
                              >
                                <p>Kenali Kekuatanmu Disini!</p>
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
                                    d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
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
        {/* <InfoTerbaru /> */}
      </Layout>
    </>
  );
}
