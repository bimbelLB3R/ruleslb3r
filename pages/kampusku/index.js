import Layout from "../../components/Layout";
import { getBlogsData } from "../../utils/blogsApi";
import { getKampusesData } from "../../utils/tambahProdiApi";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ChartDayaTampung from "../../components/ChartDayaTampung";
import ChartPeminat from "../../components/ChartPeminat";
import ChartKeketatan from "../../components/ChartKeketatan";

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
    (dataPeminat[index] / item).toFixed(3)
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

  console.log(dataKeketatan);

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
            <form>
              <div className="mb-2">
                <select
                  name="pilihanKampus"
                  className="w-[300px] border-none "
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
              <div className="mb-4">
                <select
                  name="pilihanProdi"
                  className="w-[300px] border-none"
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
              <div className="mb-4">
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
              <div className="mb-4">
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
              <div>
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
