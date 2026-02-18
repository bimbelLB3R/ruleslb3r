import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Head from "next/head";
import "animate.css";
import Image from "next/image";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Link from "next/link";
import MyDropdownTpeSoal from "./MyDropdownTipeSoal";
import { sessionGet, sessionSet, clearSession, getActiveSesi } from "../utils/lsSession";

dayjs.extend(duration);

const MAX_TIME_SNBT = {
  snbt_pu: 2250, snbt_ppu: 1200, snbt_pbm: 1500,
  snbt_pk: 1200, snbt_lbe: 1200, snbt_lbi: 1800, snbt_pm: 1200,
};
const SUBTES_SNBT = ["pu", "ppu", "pbm", "pk", "lbe", "lbi", "pm"];
const JU = "snbt";

const LoginSnbtCf = () => {
  const [erorKoneksi, setErorKoneksi]           = useState(false);
  const { data: session }                       = useSession();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router                                  = useRouter();
  const [form, setForm]                         = useState({ nisn: "", nama: "" });
  const [paketAktif, setPaketAktif]             = useState(null);
  const [loadingPaket, setLoadingPaket]         = useState(true);

  useEffect(() => {
    const fetchPaketAktif = async () => {
      setLoadingPaket(true);
      try {
        const res  = await fetch("/api/config/paket-aktif?jenis=snbt");
        const data = await res.json();
        setPaketAktif(data.paket ?? "01");
      } catch { setPaketAktif("01"); }
      finally  { setLoadingPaket(false); }
    };
    fetchPaketAktif();
  }, []);

  // Redirect jika ada sesi yang belum selesai (aktif atau timeUp belum dikirim)
  useEffect(() => {
    if (!router.isReady) return;
    const sesi = getActiveSesi();
    if (!sesi) return;

    if (sesi.isTimeUp) {
      Swal.fire({
        title: "Ada Jawaban yang Belum Dikirim!",
        text: "Waktu ujianmu sudah habis tapi jawaban belum dikirim. Kirim sekarang untuk melanjutkan.",
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "Kirim Jawaban Sekarang",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        router.push({ pathname: "/form/tolb3r", query: { link: sesi.link } });
      });
    } else {
      router.push({ pathname: "/form/tolb3r", query: { link: sesi.link } });
    }
  }, [router.isReady]);

  const cekPeserta = async (nisn) => {
    try {
      const res  = await fetch("/api/peserta/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nisn: `1${nisn}` }) });
      if (!res.ok) throw new Error();
      return (await res.json()).exists;
    } catch { setErorKoneksi(true); return null; }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    try {
      if (!form.nisn || !form.nama) {
        Swal.fire({ icon: "warning", text: "Lengkapi data terlebih dahulu" });
        return;
      }
      if (!paketAktif) {
        Swal.fire({ title: "Mohon tunggu", text: "Memuat konfigurasi paket soal...", icon: "info" });
        return;
      }

      // Tolak jika ada sesi yang belum selesai — paksa selesaikan dulu
      const sesiAktif = getActiveSesi();
      if (sesiAktif) {
        if (sesiAktif.isTimeUp) {
          await Swal.fire({
            title: "Kirim Jawaban Dulu!",
            text: "Kamu punya jawaban yang belum dikirim. Selesaikan dulu sebelum mulai ujian baru.",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "Kirim Sekarang",
            allowOutsideClick: false,
          });
          router.push({ pathname: "/form/tolb3r", query: { link: sesiAktif.link } });
        } else {
          const jenis = sesiAktif.ju === "tka" ? "TKA" : "SNBT";
          const menit = Math.ceil(sesiAktif.remaining / 60);
          const hasil = await Swal.fire({
            title: `Sedang Ada Sesi ${jenis} Aktif`,
            text: `Kamu masih mengerjakan ${jenis} (sisa ±${menit} menit). Lanjutkan dulu atau batalkan?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
            confirmButtonText: `Lanjutkan ${jenis}`,
            cancelButtonText: "Batalkan sesi itu",
          });
          if (hasil.isConfirmed) {
            router.push({ pathname: "/form/tolb3r", query: { link: sesiAktif.link } });
          } else {
            clearSession(sesiAktif.ju);
            localStorage.removeItem(`${sesiAktif.link}__startTime`);
          }
        }
        return;
      }

      // ═══════════════════════════════════════════════════════════════════════
      // CEK SUBTES SELESAI SEBELUM MASUK
      // ═══════════════════════════════════════════════════════════════════════
      const paket         = paketAktif;
      const linkSudah     = JSON.parse(sessionGet(JU, "linkSudah") || "[]");
      const subtesSelesai = linkSudah
        .filter((slug) => slug.endsWith(`_${paket}`)) // hanya paket aktif
        .map((slug) => slug.split("_").slice(1, -1).join("_"));

      const totalSubtes   = SUBTES_SNBT.length;
      const jumlahSelesai = subtesSelesai.length;

      // Skenario 1: SEMUA SUBTES SUDAH SELESAI
      if (jumlahSelesai === totalSubtes) {
        await Swal.fire({
          title: "Semua Subtes Sudah Selesai!",
          html: `
            <p class="text-sm text-gray-600 mb-3">
              Kamu sudah menyelesaikan semua ${totalSubtes} subtes SNBT paket ${paket}.
            </p>
            <p class="text-sm font-semibold text-red-600">
              Klik "Reset" di bawah jika ingin mengulang dari awal.
            </p>
          `,
          icon: "info",
          confirmButtonColor: "#2563eb",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        });
        return;
      }

      // Skenario 2: SEBAGIAN SUBTES SELESAI
      if (jumlahSelesai > 0) {
        const subtesLabel = subtesSelesai
          .map((s) => s.toUpperCase())
          .join(", ");

        const hasil = await Swal.fire({
          title: `${jumlahSelesai} Subtes Sudah Selesai`,
          html: `
            <p class="text-sm text-gray-600 mb-2">
              Subtes yang sudah selesai: <strong>${subtesLabel}</strong>
            </p>
            <p class="text-sm text-gray-600">
              Sisa ${totalSubtes - jumlahSelesai} subtes belum dikerjakan.
            </p>
          `,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#16a34a",
          cancelButtonColor: "#dc2626",
          confirmButtonText: "Lanjutkan yang Belum",
          cancelButtonText: "Reset & Ulang Semua",
        });

        if (!hasil.isConfirmed) {
          // User pilih reset — hapus semua data SNBT
          clearSession(JU);
          await Swal.fire({
            title: "Data Direset!",
            text: "Kamu bisa mulai dari awal. Silakan login lagi.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          window.location.reload();
          return;
        }
        // Lanjut ke flow normal — biarkan submitForm handle urutan
      }

      // ═══════════════════════════════════════════════════════════════════════
      // LANJUT FLOW NORMAL
      // ═══════════════════════════════════════════════════════════════════════

      const canSubmit = await cekPeserta(form.nisn);
      if (canSubmit === null) { 
        Swal.fire({ 
          title: "Koneksi Bermasalah", 
          text: "Gagal memeriksa NISN.", 
          icon: "error", 
          confirmButtonText: "Coba Lagi" 
        }); 
        return; 
      }

      if (canSubmit) {
        const subtesAwal = sessionGet(JU, "subtesAwal") || SUBTES_SNBT[0];
        
        // Filter: hapus subtes yang sudah selesai dari urutan
        const subtesAktif = SUBTES_SNBT.filter(
          (s) => !subtesSelesai.includes(s)
        );

        // Urutan: mulai dari subtesAwal yang dipilih (jika masih aktif), 
        // atau mulai dari subtes aktif pertama
        let urutan;
        if (subtesAktif.includes(subtesAwal)) {
          urutan = [subtesAwal, ...subtesAktif.filter((s) => s !== subtesAwal)];
        } else {
          urutan = subtesAktif;
        }

        const dataSoal = urutan.map((s) => `snbt_${s}_${paket}`);
        const link     = dataSoal[0];
        const subtesKey = link.split("_").slice(0, 2).join("_");
        const maxTime   = MAX_TIME_SNBT[subtesKey] ?? 1200;

        localStorage.setItem("name", form.nama);
        localStorage.setItem("nisn", `1${form.nisn}`);
        localStorage.setItem("link", link); //wajib pake
        localStorage.setItem(`${link}__startTime`, new Date().toISOString());

        sessionSet(JU, "dataSoal", JSON.stringify(dataSoal));
        sessionSet(JU, "link",     link);
        sessionSet(JU, "maxTime",  maxTime);
        sessionSet(JU, "paket",    paket);

        router.push({ pathname: "/form/tolb3r", query: { link } });
      } else {
        Swal.fire({ 
          title: `${form.nisn} belum terdaftar`, 
          text: "Silakan daftar terlebih dahulu.", 
          icon: "warning", 
          confirmButtonText: "Daftar" 
        });
        router.push("/form/newmembersup?jenisujian=snbt");
      }
    } catch { 
      Swal.fire({ 
        title: "Terjadi Kesalahan", 
        text: "Silakan coba lagi.", 
        icon: "error", 
        confirmButtonText: "Oke" 
      }); 
    }
    finally  { setIsButtonDisabled(false); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleReset  = () => { clearSession(JU); window.location.reload(); };

  return (
    <>
      <Head>
        <title>Try Out dan Simulasi UTBK SNBT</title>
        <meta name="description" content="Halaman Login Simulasi dan Try Out UTBK SNBT — Bimbel LB3R" />
        <meta property="og:image" itemProp="image" content="https://raw.githubusercontent.com/bimbelLB3R/bimbellb3r.github.io/main/img/slider/og.jpg" />
        <link rel="icon" type="image/png" sizes="4x16" href="/image/logolb3r.png" />
      </Head>
      <div className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0 animate__animated animate__slideInDown">
          <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image src="/image/logolb3r.png" width={72} height={48} alt="logo" priority className="mr-2" />
            Premium Member
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {session && (
                <div className="flex items-center justify-center">
                  <div className="border-2 border-white rounded-full relative shadow-md">
                    <Image src={session.user.image} width={72} height={72} alt="userFoto" priority className="rounded-full shadow-2xl" />
                  </div>
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">UJI COBA SOAL SNBT</h1>
                <p className="text-xs text-blue-600 font-semibold mt-1">{loadingPaket ? "⏳ Memuat paket..." : `📦 Paket ${paketAktif}`}</p>
              </div>
              {erorKoneksi && <p className="text-red-600 text-sm font-medium">⚠️ Koneksi internet kamu kurang bagus!</p>}
              <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
                <div>
                  <label htmlFor="nisn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NISN</label>
                  <input type="number" name="nisn" id="nisn" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="NISN Kamu" required onChange={handleChange} autoComplete="off" disabled={isButtonDisabled || loadingPaket} />
                </div>
                <div>
                  <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Panggilanmu</label>
                  <input type="text" name="nama" id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Nama panggilan" required onChange={handleChange} autoComplete="off" disabled={isButtonDisabled || loadingPaket} />
                </div>
                <div><MyDropdownTpeSoal disabled={isButtonDisabled || loadingPaket} /></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600" required />
                    <label htmlFor="remember" className="ml-3 text-sm text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                  <a href="https://wa.me/6281392552459" target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot NISN & Name?</a>
                </div>
                {isButtonDisabled ? <Loader /> : (
                  <button type="submit" disabled={isButtonDisabled || loadingPaket} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-60">
                    {loadingPaket ? "Memuat..." : "Mulai Kerjakan"}
                  </button>
                )}
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Belum punya akun?{" "}
                  <a href="/form/newmembersup?jenisujian=snbt" className="font-medium text-blue-600 hover:underline">Sign up</a>{" "}or{" "}
                  <button type="button" className="underline" onClick={handleReset}>Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSnbtCf;