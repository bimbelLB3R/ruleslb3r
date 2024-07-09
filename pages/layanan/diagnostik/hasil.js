import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ChartDiagnostik from "../../../components/ChartDiagnostik";
import Swal from "sweetalert2";
import { getModalitasData } from "../../../utils/modalitasApi";
import Head from "next/head";
import DownloadPdf from "../../../components/DownloadPdf";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// meminta data ke server /api
export async function getStaticProps() {
  const data = await getModalitasData();
  return {
    props: {
      allTipeModalitas: data.modalitasall
    },
  };
}

const hasilDiagnostik = ({ allTipeModalitas }) => {
  const [counts, setCounts] = useState({ A: 0, B: 0, C: 0 });
  const [result, setResult] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [namaAnak, setNamaAnak] = useState("");
  const router = useRouter();

  useEffect(() => {
    const namaAnak = localStorage.getItem('name');
    setNamaAnak(namaAnak);

    const getCounts = () => {
      const counts = { A: 0, B: 0, C: 0 };

      // Loop through all keys in local storage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('group')) {
          const value = localStorage.getItem(key);
          if (value in counts) {
            counts[value]++;
          }
        }
      }

      return counts;
    };

    const counts = getCounts();
    setCounts(counts);

    // Determine the result based on counts
    const determineResult = () => {
      const { A, B, C } = counts;
      let result = "";

      if (A > B && A > C) {
        result = "Visual";
      } else if (B > A && B > C) {
        result = "Auditori";
      } else if (C > A && C > B) {
        result = "Kinestetik";
      } else {
        const highest = Math.max(A, B, C);
        const types = [];
        if (A === highest) types.push("Visual");
        if (B === highest) types.push("Auditori");
        if (C === highest) types.push("Kinestetik");
        result = types.join(" dan ");
      }

      return result;
    };

    const result = determineResult();
    setResult(result);

    // Find the corresponding keterangan from allTipeModalitas
    const findKeterangan = () => {
      const matchedModalitas = allTipeModalitas.find(modalitas => modalitas.tipe_modalitas === result);
      return matchedModalitas ? matchedModalitas.keterangan : "Keterangan tidak ditemukan";
    };

    const keterangan = findKeterangan();
    setKeterangan(keterangan);
  }, [allTipeModalitas]);

  const handleTutup = () => {
    Swal.fire({
      title: "Kamu Yakin Ingin Keluar",
      text: "Screenshoot dulu hasil tes diagnostikmu supaya tersimpan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Saya Yakin",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Data dihapus",
          text: "Hasil lengkap akan dikirim ke sekolah",
          icon: "warning",
        });
        localStorage.clear();
        router.push("/");
      }
    });
  };

  const data = {
    labels: ['Visual', 'Auditori', 'Kinestetik'],
    values: [counts.A, counts.B, counts.C],
  };

  const handleDownload = async () => {
    const element = document.getElementById('page-content');
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('download.pdf');
  };

  return (
    <>
    <Head>
        <title>HASIL DIAGNOSTIK| Bimbel LB3R</title>
        <meta
          name="description"
          content="Hasil tes diagnostik untuk mengetahui gaya belajar."
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
    <div className="flex items-center justify-center m-4 " id="page-content">
      <div className="md:max-w-lg border p-2 shadow-md">
        <div className="flex items-center justify-center bg-gray-900 p-2 m-2">
          <p className="text-gray-50 font-semibold">HASIL TES DIAGNOSTIK</p>
        </div>
        <div className="p-2">
          <div className="mb-2 flex space-x-2"> 
            <p>Nama :</p>
            <p>{namaAnak}</p>
          </div>
          <div className="mb-2 flex space-x-2">
            <p>Hasil Diagnostik :</p>
            <p className="font-semibold">{result}</p>
          </div>
          <div className="w-[300px] md:w-[400px] mb-2">
            <ChartDiagnostik data={data} />
          </div>
          <div className="mb-2">
            <p>Keterangan :</p>
            <p>{keterangan}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center bg-gray-600 p-2 m-2">
          <button onClick={handleDownload} className="text-gray-50 font-semibold">Download Hasil</button>
        </div>
        <div className="flex items-center justify-center bg-red-600 p-2 m-2">
          <button onClick={handleTutup} className="text-gray-50 font-semibold">Keluar</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default hasilDiagnostik;
