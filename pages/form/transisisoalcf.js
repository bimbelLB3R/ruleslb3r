import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TransitionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // mencegah back
  useEffect(() => {
    const handleBack = () => {
      history.pushState(null, "", location.href);
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);
  // mencegah back end


  // pengecualian penghapusan data localstorage
  const clearLocalStorageExcept = (keysToKeep) => {
    // Simpan nilai dari keys yang ingin dipertahankan
    const savedData = {};
    keysToKeep.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        savedData[key] = value;
      }
    });
  
    // Hapus seluruh localStorage
    localStorage.clear();
  
    // Kembalikan data yang dipertahankan
    Object.keys(savedData).forEach((key) => {
      localStorage.setItem(key, savedData[key]);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ambil data dari localStorage
    const linkSudah = JSON.parse(localStorage.getItem("linkSudah") || "[]");
    const dataSoal = JSON.parse(localStorage.getItem("dataSoal") || "[]");
    const nisn = localStorage.getItem("nisn");
    const name = localStorage.getItem("name");
    const lastSoal = localStorage.getItem("link"); // Soal yang baru selesai

    if (!nisn || !name || dataSoal.length === 0) {
      router.push("/");
      return;
    }

    // Tambahkan soal terakhir ke linkSudah jika belum ada
    if (lastSoal && !linkSudah.includes(lastSoal)) {
      linkSudah.push(lastSoal);
      localStorage.setItem("linkSudah", JSON.stringify(linkSudah));
    }

    // Cari soal yang belum dikerjakan
    const linkBelum = dataSoal.filter((soal) => !linkSudah.includes(soal));

    // Simpan linkBelum ke localStorage
    localStorage.setItem("linkBelum", JSON.stringify(linkBelum));

    if (linkBelum.length === 0) {
      // Jika semua soal sudah dikerjakan, arahkan ke home
      alert("Kamu sudah selesai mengerjakan semua soal, skor nanti akan diumumkan oleh Admin LB3R");
      router.push("/");
      clearLocalStorageExcept(["linkSudah"])
      return;
    }

    // Ambil soal pertama dari linkBelum sebagai soal berikutnya
    const link = linkBelum[0];
    localStorage.setItem("link", link);

    // Tentukan maxTime berdasarkan soal yang dipilih
    const maxTimeMapping = {
      snbt: 2700, // 30 soal 45 menit
      kuantitatif: 1200, // 15 soal 20 menit
      matematika: 1800, // 20 soal 30 menit
      english: 1800, // 20 soal 30 menit
      bacaan: 5200, // 20 soal 25 menit
      penalaran: 1800, // 30 soal 30 menit
      pengetahuan: 900, // 20 soal 15 menit
    };

    const maxTime = maxTimeMapping[link] || null;

    if (maxTime) {
      localStorage.setItem("maxTime", maxTime);
    } else {
      console.log("link undetect");
    }

    // Simpan waktu mulai pengerjaan soal baru
    localStorage.setItem("startTime", new Date().toISOString());

    // Arahkan ke halaman soal setelah delay singkat (agar efek transisi terasa)
    setTimeout(() => {
      router.push(`/form/tolb3r?link=${link}`);
    }, 2000);

  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold">Memproses soal berikutnya...</p>
    </div>
  );
}
