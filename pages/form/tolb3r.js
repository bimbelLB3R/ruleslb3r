// pages/form/soalsupa.jsx
// ─── Template halaman soal universal: SNBT & TKA ─────────────────────────────
// Dipakai untuk: /form/snbtsupa  dan  /form/tkasupa (atau satu route saja)
//
// ISOLASI STATE: semua jawaban disimpan di localStorage dengan prefix slug,
// sehingga tidak ada tabrakan antar sesi SNBT & TKA meski dibuka bersamaan.
//   key lama : "group1", "group1_0"
//   key baru : "snbt_pu_01__group1", "tka_sma_matematika_01__group1_0"
//              └── prefix = slug + "__"

import React, { useState, useEffect, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import { Radio } from "antd";
import Latex from "react-latex";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Paginationsnbt from "../../components/PaginasiSoalSnbt";
import QuestionNavigation from "../../components/QuestionsNavigation";
import QuestionNavigationlg from "../../components/QuestionsNavigationlg";

dayjs.extend(duration);

// ─── Helper: parse slug ───────────────────────────────────────────────────────

const SUBTES_LABEL = {
  pu: "Penalaran Umum", ppu: "Pengetahuan & Pemahaman Umum",
  pbm: "Pemahaman Bacaan & Menulis", pk: "Pengetahuan Kuantitatif",
  lbe: "Literasi Bahasa Inggris", lbi: "Literasi Bahasa Indonesia",
  pm: "Penalaran Matematika",
  matematika: "Matematika", ipa: "IPA",
  b_indonesia: "Bahasa Indonesia", b_inggris: "Bahasa Inggris",
  ips: "IPS", fisika: "Fisika", kimia: "Kimia",
  biologi: "Biologi", ekonomi: "Ekonomi", geografi: "Geografi",
  sejarah: "Sejarah", sosiologi: "Sosiologi",
};

function parseSlug(slug = "") {
  const parts = slug.split("_");
  const prefix = parts[0];

  if (prefix === "snbt") {
    // snbt_{subtes}_{paket}
    const subtesKey = parts.slice(1, -1).join("_");
    return {
      jenisUjian: "SNBT",
      jenjang: null,
      subtesKey,
      subtesLabel: SUBTES_LABEL[subtesKey] ?? subtesKey,
      paket: parts[parts.length - 1],
      // Soal tanpa bacaan (navigasi di kiri dimatikan)
      tanpaBacaan: ["pk", "pm", "matematika", "fisika", "kimia",
                    "biologi", "ekonomi", "geografi"].includes(subtesKey),
      themeColor: "green", // SNBT = hijau (warna asli)
    };
  }

  if (prefix === "tka") {
    // tka_{jenjang}_{subtes...}_{paket}
    const jenjang = parts[1];
    const subtesKey = parts.slice(2, -1).join("_");
    return {
      jenisUjian: "TKA",
      jenjang: jenjang?.toUpperCase(),
      subtesKey,
      subtesLabel: SUBTES_LABEL[subtesKey] ?? subtesKey,
      paket: parts[parts.length - 1],
      tanpaBacaan: ["matematika", "fisika", "kimia", "biologi",
                    "ekonomi", "geografi"].includes(subtesKey),
      themeColor: "blue", // TKA = biru (beda visual dari SNBT)
    };
  }

  return {
    jenisUjian: "?", jenjang: null, subtesKey: slug,
    subtesLabel: slug, paket: "?", tanpaBacaan: true, themeColor: "gray",
  };
}

// ─── Helper: kunci localStorage ber-prefix slug ───────────────────────────────
// Mencegah tabrakan antar sesi SNBT dan TKA

function lsKey(slug, key) {
  return `${slug}__${key}`;
}

function lsGet(slug, key) {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(lsKey(slug, key));
}

function lsSet(slug, key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(lsKey(slug, key), value);
}

// ─── Hapus semua key milik slug ini, pertahankan key global ──────────────────
function clearSlugKeys(slug) {
  const keysToKeep = ["name", "nisn", "dataSoal", "paket",
                      "jenisUjian", "jenjang", "mapelPilihanSiswa"];

  const toDelete = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    // Hapus semua key milik slug ini
    if (k && k.startsWith(`${slug}__`)) toDelete.push(k);
  }
  toDelete.forEach((k) => localStorage.removeItem(k));
}

// ─── Main Component ───────────────────────────────────────────────────────────

const MainPageSoal = () => {
  const router = useRouter();

  // ── Slug & metadata ─────────────────────────────────────────────────────────
  const [slug, setSlug] = useState(""); // e.g. "snbt_pu_01"
  const [meta, setMeta] = useState(null); // hasil parseSlug

  // ── Data soal ────────────────────────────────────────────────────────────────
  const [questions, setQuestions] = useState([]);
  const [jumlahSoal, setJumlahSoal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 1;
  const paginatedPosts = questions.filter((q) => q.nomor_soal === currentPage);
  const totalPages = Math.ceil(questions.length / postsPerPage);

  // ── Jawaban ──────────────────────────────────────────────────────────────────
  const [selectedValues, setSelectedValues] = useState({});
  const [isChecked, setIsChecked] = useState({});

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isRadioButtonDisabled, setIsRadioButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [questionnav, setQuestionNav] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // ── Identitas siswa ──────────────────────────────────────────────────────────
  const [nisn, setNisn] = useState("");
  const [storedName, setStoredName] = useState("Student");

  // ── Timer ────────────────────────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState(null);

  const formRef = useRef(null);

  // ─── INIT: baca slug dari localStorage, redirect jika tidak ada ──────────────
  useEffect(() => {
    const katSoal = localStorage.getItem("link");
    if (!katSoal) {
      router.push("/form/loginsupa");
      return;
    }

    const storedNisn = localStorage.getItem("nisn");
    const name = localStorage.getItem("name");

    if (!storedNisn || !name) {
      router.push("/form/loginsupa");
      return;
    }

    setSlug(katSoal);
    setMeta(parseSlug(katSoal));
    setNisn(storedNisn);
    setStoredName(name);
  }, []);

  // ─── FETCH SOAL ──────────────────────────────────────────────────────────────
  // Jalankan setelah slug tersedia
  useEffect(() => {
    if (!slug) return;

    async function fetchQuestions() {
      setIsLoading(true);
      try {
        // API baru: filter by slug via query param
        const res = await fetch(`/api/soal/soal?kategori=${encodeURIComponent(slug)}`);

        if (!res.ok) throw new Error("Gagal mengambil soal");

        const result = await res.json();
        const data = result.data ?? [];

        setJumlahSoal(data.length);
        setQuestions(data);
        lsSet(slug, "jumlahSoal", data.length);

        // Restore jawaban tersimpan dari localStorage (ber-prefix slug)
        const restored = {};
        data.forEach((item) => {
          const saved = lsGet(slug, `group${item.nomor_soal}`);
          if (saved) restored[`group${item.nomor_soal}`] = saved;

          ["1", "2", "3", "4", "5"].forEach((_, idx) => {
            const savedP = lsGet(slug, `group${item.nomor_soal}_${idx}`);
            if (savedP) restored[`group${item.nomor_soal}_${idx}`] = savedP;
          });
        });
        setSelectedValues(restored);

        // Restore checklist
        const savedChecked = lsGet(slug, "isChecked");
        if (savedChecked) {
          try { setIsChecked(JSON.parse(savedChecked)); } catch {}
        }

      } catch (err) {
        console.error("Fetch soal error:", err);
        Swal.fire({
          title: "Gagal Memuat Soal",
          text: "Terjadi kesalahan saat memuat soal. Silakan coba lagi.",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, [slug]);

  // ─── INIT TIMER ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug) return;

    const storedMaxTime = localStorage.getItem("maxTime");
    if (!storedMaxTime) return;

    const maxSec = parseInt(storedMaxTime);
    const now = dayjs();

    // startTime per slug agar timer tiap ujian independent
    const startKey = lsKey(slug, "startTime");
    const storedStart = localStorage.getItem(startKey);
    const startTime = storedStart ? dayjs(storedStart) : now;

    if (!storedStart) {
      localStorage.setItem(startKey, now.toISOString());
    }

    const elapsed = now.diff(startTime, "second");
    const remaining = Math.max(0, maxSec - elapsed);
    setTimeLeft(dayjs.duration(remaining, "second"));

    // Restore currentPage
    const savedPage = lsGet(slug, "currentPage");
    if (savedPage) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(Number(savedPage));
        setIsLoading(false);
      }, 600);
    } else {
      setCurrentPage(1);
    }
  }, [slug]);

  // ─── COUNTDOWN ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!timeLeft) return;

    if (timeLeft.asSeconds() <= 0) {
      handleTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev.subtract(1, "second");
        if (next.asSeconds() <= 0) {
          clearInterval(interval);
          handleTimeUp();
          return prev;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft?.asSeconds() > 0]); // eslint-disable-line

  const handleTimeUp = () => {
    Swal.fire({
      title: "Waktu Habis!",
      text: "Kirim jawabanmu sekarang.",
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => setIsRadioButtonDisabled(true));
  };

  // ─── Visibilitychange: sinkron timer saat tab aktif kembali ──────────────────
  useEffect(() => {
    if (!slug) return;

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      const storedMaxTime = localStorage.getItem("maxTime");
      const startKey = lsKey(slug, "startTime");
      const startTime = localStorage.getItem(startKey)
        ? dayjs(localStorage.getItem(startKey))
        : dayjs();
      const elapsed = dayjs().diff(startTime, "second");
      const remaining = Math.max(0, parseInt(storedMaxTime) - elapsed);
      setTimeLeft(dayjs.duration(remaining, "second"));
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [slug]);

  // ─── Scroll visibility ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // ─── Cegah tombol back ────────────────────────────────────────────────────────
  useEffect(() => {
    const onBack = () => history.pushState(null, "", location.href);
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);

  // ─── Keyboard nav ─────────────────────────────────────────────────────────────
  const handlePrevious = useCallback(() => {
    setCurrentPage((p) => {
      const newP = Math.max(p - 1, 1);
      lsSet(slug, "currentPage", newP);
      return newP;
    });
  }, [slug]);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => {
      const newP = Math.min(p + 1, totalPages);
      lsSet(slug, "currentPage", newP);
      return newP;
    });
  }, [slug, totalPages]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrevious]);

  // ─── Questionnav (navigasi kiri): aktif jika soal punya bacaan ───────────────
  useEffect(() => {
    if (!meta) return;
    // tanpaBacaan sudah dideteksi dari slug, tapi juga cek data aktual
    const hasBacaan = paginatedPosts[0]?.bacaan_1?.length > 0;
    setQuestionNav(hasBacaan);
  }, [meta, paginatedPosts]);

  // ─── Handle perubahan jawaban ─────────────────────────────────────────────────
  const handleChange = (e) => {
    setRefreshKey((prev) => prev + 1);
    const { name, value, type, checked } = e.target;

    setSelectedValues((prev) => {
      let updated;
      if (type === "checkbox") {
        const existing = prev[name] || [];
        updated = checked
          ? [...existing, value]
          : existing.filter((v) => v !== value);
        lsSet(slug, name, updated);
      } else {
        updated = value;
        lsSet(slug, name, updated);
      }
      return { ...prev, [name]: updated };
    });
  };

  // ─── Checklist ragu-ragu ──────────────────────────────────────────────────────
  const handleCheckbox = (page) => {
    setIsChecked((prev) => {
      const next = { ...prev, [page]: !prev[page] };
      lsSet(slug, "isChecked", JSON.stringify(next));
      return next;
    });
  };

  // ─── Hitung soal yang sudah dijawab ──────────────────────────────────────────
  const countAnswered = () => {
    const groups = new Set();
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      // Key format: "{slug}__group{n}" atau "{slug}__group{n}_{m}"
      if (k && k.startsWith(`${slug}__group`)) {
        const val = localStorage.getItem(k);
        if (val) {
          // Ambil groupId: "group1" dari "snbt_pu_01__group1" atau "snbt_pu_01__group1_0"
          const inner = k.replace(`${slug}__`, "");
          const groupId = inner.split("_")[0] +
            (inner.includes("group") ? inner.match(/group\d+/)?.[0]?.replace("group", "") ?? "" : "");
          // Sederhananya: ambil prefix sebelum underscore terakhir jika ada sub-index
          const cleanGroup = inner.includes("_") && !inner.match(/^group\d+$/)
            ? inner.split("_").slice(0, -1).join("_") // group1_0 → group1
            : inner;
          groups.add(cleanGroup);
        }
      }
    }
    return groups.size;
  };

  // ─── Kirim jawaban ke API ─────────────────────────────────────────────────────
  const kirimJawaban = async (payload) => {
    try {
      const res = await fetch("/api/soal/jawaban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kategori: slug, ...payload }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Gagal mengirim jawaban");
      console.log("Jawaban:", result.message);
    } catch (err) {
      console.error("Kirim jawaban error:", err);
      Swal.fire({
        title: "Gagal Mengirim Jawaban",
        text: "Terjadi kesalahan. Silakan coba lagi.",
        icon: "error",
      });
      throw err;
    }
  };

  // ─── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const answered = countAnswered();
    const belum = jumlahSoal - answered;

    Swal.fire({
      title: "Kirim Jawaban?",
      text: `Masih ada ${belum} soal belum dijawab. Sisa waktu: ${
        timeLeft ? timeLeft.format("mm:ss") : "-"
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) submitForm(e);
    });
  };

  const submitForm = async (e) => {
    e?.preventDefault();
    setIsButtonDisabled(true);

    // Konversi selectedValues ke format jawaban j_1, j_2, ...
    const reduced = Object.entries(selectedValues).reduce((acc, [name, val]) => {
      // Tipe benar/salah: name = "group1_0", val = "1B"
      if (name.includes("_") && name.startsWith("group")) {
        const groupId = name.split("_")[0]; // "group1"
        const subIdx  = parseInt(name.split("_")[1]);
        if (!acc[groupId]) acc[groupId] = [];
        acc[groupId].push({ index: subIdx, value: val });
      }
      // Tipe checkbox: val bisa array
      else if (Array.isArray(val)) {
        acc[name] = val.map(Number).sort((a, b) => a - b).join("");
      }
      else if (typeof val === "string" && val.includes(",")) {
        acc[name] = val.split(",").map(Number).sort((a, b) => a - b).join("");
      }
      else {
        acc[name] = val;
      }
      return acc;
    }, {});

    // Flatten benar/salah
    Object.keys(reduced).forEach((k) => {
      if (Array.isArray(reduced[k])) {
        reduced[k] = reduced[k]
          .sort((a, b) => a.index - b.index)
          .map((i) => i.value)
          .join("");
      }
    });

    // Rename group{n} → j_{n}
    const jawaban = {};
    Object.entries(reduced).forEach(([k, v]) => {
      const nomor = k.replace("group", "");
      jawaban[`j_${nomor}`] = v;
    });

    const payload = { nisn, nama: storedName, ...jawaban };

    setIsLoading(true);
    try {
      await kirimJawaban(payload);
    } catch {
      setIsButtonDisabled(false);
      setIsLoading(false);
      return;
    }

    // Bersihkan hanya key milik slug ini
    clearSlugKeys(slug);
    setSelectedValues({});
    setIsLoading(false);

    // Transisi ke soal berikutnya
    let timerInterval;
    await Swal.fire({
      title: "Tunggu ya...",
      html: "Menuju soal berikutnya dalam <b></b>ms.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => clearInterval(timerInterval),
    });

    router.push("/form/transisisoalcf");
  };

  // ─── Derived ──────────────────────────────────────────────────────────────────
  const tipeSoal = questions[0]?.kategori_soal ?? meta?.subtesLabel ?? "";
  const themeIsGreen = meta?.themeColor === "green";
  const headerBg = themeIsGreen
    ? "bg-gradient-to-bl from-gray-800 to-green-800"
    : "bg-gradient-to-bl from-gray-800 to-blue-800";

  // ─── RENDER ───────────────────────────────────────────────────────────────────

  const jumlahSelesai = countAnswered();

  return (
    <div>
      <Head>
        <title>
          {meta?.jenisUjian ?? "Latihan"} — {tipeSoal} | Bimbel LB3R
        </title>
        <meta name="theme-color" content={themeIsGreen ? "#166534" : "#1e40af"} />
        <link rel="icon" type="image/png" sizes="4x16" href="/image/logolb3r.png" />
      </Head>

      {/* ── Navigasi bawah (pagination) ─────────────────────────────────────── */}
      <div className={`sm:flex justify-center fixed bottom-0 z-50 overflow-auto left-0 right-0 ${headerBg}`}>
        <Paginationsnbt
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={(p) => {
            setCurrentPage(p);
            lsSet(slug, "currentPage", p);
          }}
          isChecked={isChecked}
          selectedValues={selectedValues}
          allData={paginatedPosts}
        />
      </div>

      {/* ── Header atas: label subtes + progress ────────────────────────────── */}
      <div
        className={`flex justify-center items-center fixed top-[0.8rem] z-50 left-0 pl-2 text-gray-100 text-xs md:text-sm transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <p>
          {meta?.jenisUjian}
          {meta?.jenjang ? `-${meta.jenjang}` : ""}-{tipeSoal} | {currentPage}/{totalPages}
        </p>
      </div>

      <div
        className={`flex justify-center items-center fixed top-0 z-40 left-0 right-0 text-gray-100 text-xs md:text-sm transition-all duration-700 ${
          isVisible ? `translate-y-0 ${headerBg} opacity-100` : "-translate-y-full opacity-0"
        }`}
      >
        <div className="p-2 rounded-full h-12" />
      </div>

      {/* ── Timer & tombol navigasi atas kanan ──────────────────────────────── */}
      <div className={`fixed top-[0.8rem] z-50 right-[6rem] flex space-x-4 text-white transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="font-bold">
          {timeLeft ? timeLeft.format("mm:ss") : "--:--"}
        </div>
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
          </svg>
        </button>
      </div>
      {showNav && (
        <QuestionNavigation
          totalQuestions={jumlahSoal}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={(p) => {
            setCurrentPage(p);
            lsSet(slug, "currentPage", p);
          }}
          onClose={() => setShowNav(false)}
        />
      )}

      {/* ── Tombol Kirim (kanan atas) ────────────────────────────────────────── */}
      <div
        className={`fixed top-[0.8rem] z-50 right-2 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {isButtonDisabled ? (
          <Loader />
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-1 text-green-300 font-bold"
          >
            <span>Kirim</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Loading ──────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-center mt-[50px]">
          <Loader />
        </div>
      ) : (
        <main>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="max-w-xl lg:max-w-full select-none flex items-center justify-center m-auto p-4 bg-white text-gray-900">
              <div className="mb-4">
                <input type="hidden" name="nisn" value={nisn} readOnly />

                {paginatedPosts.map((item) => {
                  const options = ["A", "B", "C", "D", "E"].filter(
                    (o) => item[`pilihan_${o.toLowerCase()}`] || item[`pilihan_${o.toLowerCase()}_img`]
                  );
                  const statements = ["1", "2", "3", "4", "5"].filter(
                    (s) => item[`pernyataan_${s}`] || item[`pernyataan_${s}_img`]
                  );
                  const hasBacaan = !!item.bacaan_1?.length;

                  return (
                    <div key={item.id} className="bg-white lg:m-10 p-2 text-base">
                      {/* Nomor soal */}
                      <div className="flex items-center justify-center">
                        <div className="mt-10">
                          <p className="bg-gray-300 text-gray-900 text-xs text-center font-semibold">Soal</p>
                          <p className="text-justify mb-2 font-bold flex items-center p-1 bg-gray-900 text-gray-100">
                            Nomor {currentPage}
                          </p>
                        </div>
                      </div>

                      <div className="lg:flex lg:p-10 lg:space-x-4 lg:w-full" id="custom-text">
                        {/* ── Kolom kiri: bacaan/stimulus ─────────────────── */}
                        <div
                          className={`${
                            hasBacaan
                              ? "lg:w-1/2 overflow-auto max-h-[500px] rounded-t-lg mt-8 p-4 border"
                              : "hidden"
                          }`}
                        >
                          {questionnav && (
                            <QuestionNavigationlg
                              totalQuestions={jumlahSoal}
                              totalPages={totalPages}
                              currentPage={currentPage}
                              refreshKey={refreshKey}
                              setCurrentPage={(p) => {
                                setCurrentPage(p);
                                lsSet(slug, "currentPage", p);
                              }}
                            />
                          )}
                          <p className="text-center mb-2 font-semibold mt-8 lg:mt-0">{item.judul_text1}</p>
                          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((n) => {
                            const val = item[`bacaan_${n}`];
                            if (!val) return null;
                            const isBold = n === 10 || n === 16;
                            const isHtml = n === 14 || n === 16;
                            return isHtml ? (
                              <div key={n} className="mb-4" dangerouslySetInnerHTML={{ __html: val }} />
                            ) : (
                              <p key={n} className={`text-justify mb-2 ${isBold ? "font-semibold text-center" : ""}`}>
                                <Latex>{val}</Latex>
                              </p>
                            );
                          })}
                        </div>

                        {/* ── Kolom kanan: soal + opsi ────────────────────── */}
                        <div className={hasBacaan ? "lg:w-1/2 rounded-t-lg mt-0 md:mt-9" : "lg:max-w-2xl lg:mx-auto w-full"}>
                          <div className="flex items-center space-x-2 p-2">
                            <div>
                              <div className="flex items-center justify-center">
                                {item.link_gambar && <img src={item.link_gambar} alt="Gambar soal" />}
                              </div>
                              {item.bacaan_15 && (
                                <p className="text-left p-1"><Latex>{item.bacaan_15}</Latex></p>
                              )}
                              <p className="text-left p-1">
                                {item.inner_html === "yes"
                                  ? <span dangerouslySetInnerHTML={{ __html: item.soal }} />
                                  : <Latex>{item.soal}</Latex>
                                }
                              </p>
                            </div>
                          </div>

                          <div className="pr-4 pl-4">
                            {/* Benar/Salah */}
                            {item.typeOpsi === "benarsalah" && (
                              <div className="border p-2 rounded-lg">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr>
                                      <th className="border p-2">Pernyataan</th>
                                      <th className="border p-2">B</th>
                                      <th className="border p-2">S</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {statements.map((s, idx) => {
                                      const img = item[`pernyataan_${s}_img`];
                                      const txt = item[`pernyataan_${s}`];
                                      return (
                                        <tr key={idx}>
                                          <td className="border p-2">
                                            {img && <img src={img} alt={`Pernyataan ${s}`} className="max-w-xs h-auto mb-2 rounded cursor-pointer" onClick={() => Swal.fire({ imageUrl: img, showConfirmButton: false, showCloseButton: true })} />}
                                            {txt && (item.inner_html === "yes"
                                              ? <div dangerouslySetInnerHTML={{ __html: txt }} />
                                              : <Latex>{txt}</Latex>)}
                                          </td>
                                          <td className="border p-2 text-center">
                                            <input type="radio" name={`group${item.nomor_soal}_${idx}`} value={`${s}B`}
                                              checked={selectedValues[`group${item.nomor_soal}_${idx}`] === `${s}B`}
                                              onChange={handleChange} disabled={isRadioButtonDisabled} />
                                          </td>
                                          <td className="border p-2 text-center">
                                            <input type="radio" name={`group${item.nomor_soal}_${idx}`} value={`${s}S`}
                                              checked={selectedValues[`group${item.nomor_soal}_${idx}`] === `${s}S`}
                                              onChange={handleChange} disabled={isRadioButtonDisabled} />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* Input Angka */}
                            {item.typeOpsi === "inputangka" && (
                              <input type="number" disabled={isRadioButtonDisabled}
                                placeholder="Masukkan angka"
                                className="border rounded-lg p-2 w-full"
                                value={selectedValues[`group${item.nomor_soal}`] ?? ""}
                                onChange={(e) => handleChange({ target: { name: `group${item.nomor_soal}`, value: e.target.value } })}
                              />
                            )}

                            {/* Checkbox */}
                            {item.typeOpsi === "checkbox" && (
                              <div className="flex flex-col space-y-2">
                                {statements.map((s, idx) => (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <input type="checkbox" disabled={isRadioButtonDisabled}
                                      id={`cb-${item.id}-${idx}`}
                                      name={`group${item.nomor_soal}`}
                                      value={s}
                                      checked={selectedValues[`group${item.nomor_soal}`]?.includes(s) ?? false}
                                      onChange={handleChange}
                                    />
                                    <label htmlFor={`cb-${item.id}-${idx}`} className="text-left text-base">
                                      <Latex>{item[`pernyataan_${s}`]}</Latex>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Pilihan Ganda */}
                            {item.typeOpsi === "pilgan" && options.length > 0 && (
                              <Radio.Group disabled={isRadioButtonDisabled}
                                onChange={handleChange}
                                value={selectedValues[`group${item.nomor_soal}`] ?? ""}
                                name={`group${item.nomor_soal}`}
                              >
                                {options.map((opt) => {
                                  const img = item[`pilihan_${opt.toLowerCase()}_img`];
                                  const txt = item[`pilihan_${opt.toLowerCase()}`];
                                  const isSelected = selectedValues[`group${item.nomor_soal}`] === opt;
                                  return (
                                    <div key={opt} className="flex space-x-1">
                                      <div className={`mb-2 p-2 rounded-2xl border w-full ${isSelected ? "bg-gradient-to-br from-green-400 to-green-100" : ""}`}>
                                        <Radio value={opt} className="text-justify relative w-full">
                                          <div className="flex items-start space-x-4">
                                            <div className={`p-1 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center ${isSelected ? "border-2 bg-green-500" : "bg-gray-500"}`}>
                                              <p className="font-bold text-gray-100">{opt}</p>
                                            </div>
                                            <div className="flex-1">
                                              {img && <img src={img} alt={`Pilihan ${opt}`} className="max-w-full h-auto mb-2 rounded border cursor-pointer hover:scale-105 transition-transform"
                                                onClick={(e) => { e.stopPropagation(); Swal.fire({ imageUrl: img, showConfirmButton: false, showCloseButton: true }); }} />}
                                              {txt && (item.inner_html === "yes"
                                                ? <div className="text-left text-base" dangerouslySetInnerHTML={{ __html: txt }} />
                                                : <div className="text-left text-base"><Latex>{txt}</Latex></div>)}
                                            </div>
                                          </div>
                                        </Radio>
                                      </div>
                                    </div>
                                  );
                                })}
                              </Radio.Group>
                            )}
                          </div>

                          {/* Checklist ragu-ragu */}
                          <div className="checklist flex flex-col items-center mt-10 mb-10">
                            <input type="checkbox"
                              className="w-4 h-4 text-red-400 bg-gray-100 border-gray-300 rounded"
                              checked={isChecked[currentPage] ?? false}
                              onChange={() => handleCheckbox(currentPage)}
                              disabled={isRadioButtonDisabled}
                            />
                            <label className="text-xs pl-10 pr-10 text-center text-green-600">
                              Tandai jika masih ragu atau soal mau dilewati dulu
                            </label>
                            <p className="border-b-2 border-gray-400 p-2 text-green-600 text-xs font-bold">
                              Soal Nomor-{currentPage}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>

          {/* ── Tombol Prev / Next ────────────────────────────────────────────── */}
          {currentPage > 1 && (
            <button onClick={handlePrevious}
              className="bg-green-500 p-4 text-gray-50 fixed bottom-[1.10rem] left-0 z-50 flex items-center space-x-2 rounded-tr-full rounded-br-full transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
              </svg>
              <span className="text-xs">PREV</span>
            </button>
          )}
          {currentPage < totalPages && (
            <button onClick={handleNext}
              className="bg-green-500 p-4 text-gray-50 fixed bottom-[1.10rem] right-0 z-50 flex items-center space-x-2 rounded-tl-full rounded-bl-full transition duration-300">
              <span className="text-xs">NEXT</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
              </svg>
            </button>
          )}
        </main>
      )}
    </div>
  );
};

export default MainPageSoal;