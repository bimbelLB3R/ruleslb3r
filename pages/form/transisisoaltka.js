import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function TransitionPage() {
  const router = useRouter();

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

  // pengecualian penghapusan data localStorage
  const clearLocalStorageExcept = (keysToKeep) => {
    const savedData = {};
    keysToKeep.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        savedData[key] = value;
      }
    });
    localStorage.clear();
    Object.keys(savedData).forEach((key) => {
      localStorage.setItem(key, savedData[key]);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const linkSudah = JSON.parse(localStorage.getItem("linkSudah") || "[]");
    const dataSoal = JSON.parse(localStorage.getItem("dataSoal") || "[]");
    const nisn = localStorage.getItem("nisn");
    const name = localStorage.getItem("name");
    const lastSoal = localStorage.getItem("link");

    if (!nisn || !name || dataSoal.length === 0) {
      router.push("/");
      return;
    }

    if (lastSoal && !linkSudah.includes(lastSoal)) {
      linkSudah.push(lastSoal);
      localStorage.setItem("linkSudah", JSON.stringify(linkSudah));
    }

    const linkBelum = dataSoal.filter((soal) => !linkSudah.includes(soal));
    localStorage.setItem("linkBelum", JSON.stringify(linkBelum));

    if (linkBelum.length === 0) {
      Swal.fire({
        title: "Semua soal sudah dikerjakan",
        text: "Skor akan diumumkan oleh Admin LB3R",
        icon: "success",
        confirmButtonText: "Kembali ke Home",
      }).then(() => {
        clearLocalStorageExcept(["linkSudah"]);
        router.push("/");
      });
      return;
    }

    const link = linkBelum[0];
    localStorage.setItem("link", link);

    // Simpan maxTimeMapping tapi JANGAN SET DULU
    const maxTimeMapping = {
      mattka: 1200,
      indtka: 2250,
      engtka: 1800,
      bindolanjut: 1800,
      binglanjut: 1800,
      fisika: 1500,
      kimia: 1500,
      biologi: 1500,
      ekonomi: 1500,
      geografi: 1500,
      sosiologi: 1500,
      sejarah: 1500,
      jepang: 1500,
    };

    const maxTime = maxTimeMapping[link] || null;

    // === Delay Transisi + SweetAlert ===
    setTimeout(() => {
      Swal.fire({
        title: "Lanjut ke soal berikutnya?",
        text: "Apakah kamu mau melanjutkan ke soal selanjutnya sekarang?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, Lanjut",
        cancelButtonText: "Tidak, Kembali ke Home",
      }).then((result) => {
        if (result.isConfirmed) {
          // 🟢 User mau lanjut → set maxTime & startTime sekarang
          if (maxTime) {
            localStorage.setItem("maxTime", maxTime);
          }

          // Buat waktu UTC +8 (WITA)
          const now = new Date();
          const witaOffset = 8 * 60; // menit
          const witaTime = new Date(now.getTime() + witaOffset * 60 * 1000);
          localStorage.setItem("startTime", witaTime.toISOString());

          router.push(`/form/tkasupa?link=${link}`);
        } else {
          clearLocalStorageExcept(["linkSudah","jenisUjian"]);
          router.push("/");
        }
      });
    }, 2000);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold">tunggu bentar ya...</p>
    </div>
  );
}
