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
import Dropdown from "./DropdownTipeSoal";

dayjs.extend(duration);

const MAX_TIME_SNBT = {
  snbt_pu:  2250,
  snbt_ppu: 1200,
  snbt_pbm: 1500,
  snbt_pk:  1200,
  snbt_lbe: 1200,
  snbt_lbi: 1800,
  snbt_pm:  1200,
};

const SUBTES_SNBT = ["pu", "ppu", "pbm", "pk", "lbe", "lbi", "pm"];

const LoginSnbtCf = () => {
  const [erorKoneksi, setErorKoneksi]       = useState(false);
  const { data: session }                   = useSession();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router                              = useRouter();
  const [form, setForm]                     = useState({ nisn: "", nama: "" });

  // Paket aktif dari database — diisi oleh fetchPaketAktif()
  const [paketAktif, setPaketAktif]         = useState(null);  // null = masih loading
  const [loadingPaket, setLoadingPaket]     = useState(true);

  // ─── Fetch paket aktif dari API (baca DB) ──────────────────────────────────
  useEffect(() => {
    const fetchPaketAktif = async () => {
      setLoadingPaket(true);
      try {
        const res  = await fetch("/api/config/paket-aktif?jenis=snbt");
        const data = await res.json();
        setPaketAktif(data.paket ?? "01");
      } catch (err) {
        console.error("Fetch paket aktif error:", err);
        setPaketAktif("01"); // fallback
      } finally {
        setLoadingPaket(false);
      }
    };
    fetchPaketAktif();
  }, []);

  // ─── Redirect jika masih ada sesi SNBT aktif ───────────────────────────────
  useEffect(() => {
    if (!router.isReady) return;
    const link          = localStorage.getItem("link");
    const jenisUjian    = localStorage.getItem("jenisUjian");
    const storedMaxTime = localStorage.getItem("maxTime");
    if (!link || !storedMaxTime || jenisUjian !== "snbt") return;

    const storedStart = localStorage.getItem(`${link}__startTime`);
    const startTime   = storedStart ? dayjs(storedStart) : dayjs();
    const remaining   = Math.max(0, parseInt(storedMaxTime) - dayjs().diff(startTime, "second"));
    if (remaining > 0) router.push({ pathname: "/form/tolb3r", query: { link } });
  }, [router.isReady]);

  // ─── Cek NISN via API ──────────────────────────────────────────────────────
  const cekPeserta = async (nisn) => {
    try {
      const res = await fetch("/api/peserta/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nisn: `1${nisn}` }),
      });
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      return data.exists;
    } catch (err) {
      setErorKoneksi(true);
      return null;
    }
  };

  // ─── Submit login ──────────────────────────────────────────────────────────
  const submitForm = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    try {
      if (!form.nisn || !form.nama) return;

      // Jangan biarkan submit jika paket belum selesai di-fetch
      if (!paketAktif) {
        Swal.fire({ title: "Mohon tunggu", text: "Memuat konfigurasi paket soal...", icon: "info" });
        return;
      }

      const canSubmit = await cekPeserta(form.nisn);

      if (canSubmit === null) {
        Swal.fire({ title: "Koneksi Bermasalah", text: "Gagal memeriksa NISN. Coba lagi.", icon: "error", confirmButtonText: "Coba Lagi" });
        return;
      }

      if (canSubmit) {
        // Paket dari DB — semua user dapat nilai yang sama
        const paket     = paketAktif;
        const dataSoal  = SUBTES_SNBT.map((s) => `snbt_${s}_${paket}`);
        const link      = dataSoal[0];
        const subtesKey = link.split("_").slice(0, 2).join("_"); // "snbt_pu"
        const maxTime   = MAX_TIME_SNBT[subtesKey] ?? 1200;

        localStorage.setItem("jenisUjian", "snbt");
        localStorage.setItem("name", form.nama);
        localStorage.setItem("nisn", `1${form.nisn}`);
        localStorage.setItem("dataSoal", JSON.stringify(dataSoal));
        localStorage.setItem("link", link);
        localStorage.setItem("maxTime", maxTime);
        // Simpan juga paket agar komponen lain bisa baca jika perlu
        localStorage.setItem("paket", paket);

        router.push({ pathname: "/form/tolb3r", query: { link } });

      } else {
        Swal.fire({ title: `${form.nisn} belum terdaftar`, text: "Silakan daftar terlebih dahulu.", icon: "warning", confirmButtonText: "Daftar" });
        router.push("/form/newmembersup?jenisujian=snbt");
      }

    } catch (err) {
      Swal.fire({ title: "Terjadi Kesalahan", text: "Silakan coba lagi.", icon: "error", confirmButtonText: "Oke" });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleReset  = () => { localStorage.clear(); window.location.reload(); };

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
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  UJI COBA SOAL SNBT
                </h1>
                {/* Badge paket aktif */}
                <p className="text-xs text-blue-600 font-semibold mt-1">
                  {loadingPaket
                    ? "⏳ Memuat paket..."
                    : `📦 Paket ${paketAktif}`
                  }
                </p>
              </div>

              {erorKoneksi && (
                <p className="text-red-600 text-sm font-medium">⚠️ Koneksi internet kamu kurang bagus!</p>
              )}

              <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
                <div>
                  <label htmlFor="nisn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NISN</label>
                  <input type="number" name="nisn" id="nisn"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="NISN Kamu" required onChange={handleChange} autoComplete="off"
                    disabled={isButtonDisabled || loadingPaket} />
                </div>

                <div>
                  <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Panggilanmu</label>
                  <input type="text" name="nama" id="nama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nama panggilan" required onChange={handleChange} autoComplete="off"
                    disabled={isButtonDisabled || loadingPaket} />
                </div>

                <div><Dropdown disabled={isButtonDisabled || loadingPaket} /></div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <input id="remember" type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
                      required />
                    <label htmlFor="remember" className="ml-3 text-sm text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                  <a href="https://wa.me/6281392552459" target="_blank" rel="noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Forgot NISN & Name?
                  </a>
                </div>

                {isButtonDisabled ? <Loader /> : (
                  <button type="submit" disabled={isButtonDisabled || loadingPaket}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-60">
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