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
import Dropdownjenjang from "./DropdownJenjang";
import { sessionGet, sessionSet, clearSession, getActiveSesi } from "../utils/lsSession";

dayjs.extend(duration);

const MAX_TIME_TKA = {
  matematika: 1800, ipa: 1500, b_indonesia: 1500,
  b_inggris:  1500, ips: 1200, fisika:      1500,
  kimia:      1500, biologi: 1500, ekonomi: 1500,
  geografi:   1500, sejarah: 1500, sosiologi: 1500,
};
const SUBTES_WAJIB = {
  sd:  ["matematika", "ipa", "b_indonesia", "ips"],
  smp: ["matematika", "ipa", "b_indonesia", "b_inggris", "ips"],
  sma: ["matematika", "b_indonesia", "b_inggris"],
};
const PEMINATAN_SMA = ["fisika","kimia","biologi","ekonomi","geografi","sejarah","sosiologi"];
const JU = "tka";

function subtesFromSlug(slug) {
  return slug.split("_").slice(2, -1).join("_");
}

const LoginTkaCf = () => {
  const [erorKoneksi, setErorKoneksi]           = useState(false);
  const { data: session }                       = useSession();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router                                  = useRouter();
  const [form, setForm]                         = useState({ nisn: "", nama: "" });
  const [jenjang, setJenjang]                   = useState(() => {
    if (typeof window === "undefined") return null;
    return sessionGet(JU, "jenjang") || null;
  });
  const [paketAktif, setPaketAktif]             = useState(null);
  const [loadingPaket, setLoadingPaket]         = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionGet(JU, "jenjang");
    if (stored && stored !== jenjang) setJenjang(stored);
    const originalSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (key, value) {
      originalSetItem(key, value);
      if (key === "jenjang") { originalSetItem(`${JU}__jenjang`, value); setJenjang(value); }
      if (key === `${JU}__jenjang`) setJenjang(value);
    };
    return () => { localStorage.setItem = originalSetItem; };
  }, []);

  useEffect(() => {
    if (!jenjang) return;
    const fetch_ = async () => {
      setLoadingPaket(true);
      try {
        const res  = await fetch(`/api/config/paket-aktif?jenis=tka&jenjang=${jenjang}`);
        const data = await res.json();
        setPaketAktif(data.paket ?? "01");
      } catch { setPaketAktif("01"); }
      finally  { setLoadingPaket(false); }
    };
    fetch_();
  }, [jenjang]);

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
      const currentJenjang = sessionGet(JU, "jenjang") || localStorage.getItem("jenjang");
      if (!currentJenjang || !SUBTES_WAJIB[currentJenjang]) {
        Swal.fire({ title: "Jenjang Belum Dipilih", text: "Pilih jenjang (SD / SMP / SMA) terlebih dahulu.", icon: "warning" }); return;
      }
      if (!paketAktif) {
        Swal.fire({ title: "Mohon tunggu", text: "Memuat konfigurasi paket soal...", icon: "info" }); return;
      }

      // Tolak jika ada sesi yang belum selesai
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
          const jenis = sesiAktif.ju === "snbt" ? "SNBT" : "TKA";
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

      const canSubmit = await cekPeserta(form.nisn);
      if (canSubmit === null) { Swal.fire({ title: "Koneksi Bermasalah", text: "Gagal memeriksa NISN.", icon: "error", confirmButtonText: "Coba Lagi" }); return; }

      if (canSubmit) {
        let subtesList = [...SUBTES_WAJIB[currentJenjang]];
        if (currentJenjang === "sma") {
          const mapelPilihan = JSON.parse(sessionGet(JU, "mapelPilihanSiswa") || "[]");
          subtesList = [...subtesList, ...mapelPilihan.filter((m) => PEMINATAN_SMA.includes(m)).slice(0, 2)];
        }
        const subtesAwal = sessionGet(JU, "subtesAwalTka") || subtesList[0];
        const urutan     = [subtesAwal, ...subtesList.filter((s) => s !== subtesAwal)];
        const paket      = paketAktif;
        const dataSoal   = urutan.map((s) => `tka_${currentJenjang}_${s}_${paket}`);
        const link       = dataSoal[0];
        const maxTime    = MAX_TIME_TKA[subtesFromSlug(link)] ?? 1200;

        localStorage.setItem("name", form.nama);
        localStorage.setItem("nisn", `1${form.nisn}`);
        localStorage.setItem("link", link);
        localStorage.setItem(`${link}__startTime`, new Date().toISOString());

        sessionSet(JU, "dataSoal", JSON.stringify(dataSoal));
        sessionSet(JU, "link",     link);
        sessionSet(JU, "maxTime",  maxTime);
        sessionSet(JU, "paket",    paket);
        sessionSet(JU, "jenjang",  currentJenjang);

        router.push({ pathname: "/form/tolb3r", query: { link } });
      } else {
        Swal.fire({ title: `${form.nisn} belum terdaftar`, text: "Silakan daftar terlebih dahulu.", icon: "warning", confirmButtonText: "Daftar" });
        router.push("/form/newmembersup?jenisujian=tka");
      }
    } catch { Swal.fire({ title: "Terjadi Kesalahan", text: "Silakan coba lagi.", icon: "error", confirmButtonText: "Oke" }); }
    finally  { setIsButtonDisabled(false); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleReset  = () => { clearSession(JU); window.location.reload(); };
  const formDisabled = isButtonDisabled || loadingPaket;

  return (
    <>
      <Head>
        <title>Try Out dan Simulasi TKA</title>
        <meta name="description" content="Halaman Login Simulasi dan Try Out Program TKA — Bimbel LB3R" />
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
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">UJI COBA SOAL TKA</h1>
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  {!jenjang ? "👆 Pilih jenjang dulu" : loadingPaket ? "⏳ Memuat paket..." : `📦 Paket ${paketAktif} · ${jenjang.toUpperCase()}`}
                </p>
              </div>
              {erorKoneksi && <p className="text-red-600 text-sm font-medium">⚠️ Koneksi internet kamu kurang bagus!</p>}
              <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
                <div>
                  <label htmlFor="nisn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NISN</label>
                  <input type="number" name="nisn" id="nisn" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="NISN Kamu" required onChange={handleChange} autoComplete="off" disabled={isButtonDisabled || loadingPaket} />
                </div>
                <div>
                  <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Panggilanmu</label>
                  <input type="text" name="nama" id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Nama panggilan" required onChange={handleChange} autoComplete="off" disabled={formDisabled} />
                </div>
                <div><Dropdownjenjang disabled={formDisabled} /></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600" required />
                    <label htmlFor="remember" className="ml-3 text-sm text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                  <a href="https://wa.me/6281392552459" target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot NISN & Name?</a>
                </div>
                {isButtonDisabled ? <Loader /> : (
                  <button type="submit" disabled={formDisabled || !jenjang} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-60">
                    {loadingPaket ? "Memuat..." : "Mulai Kerjakan"}
                  </button>
                )}
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Belum punya akun?{" "}
                  <a href="/form/newmembersup?jenisujian=tka" className="font-medium text-blue-600 hover:underline">Sign up</a>{" "}or{" "}
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

export default LoginTkaCf;