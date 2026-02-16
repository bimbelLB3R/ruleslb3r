import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  sessionGet, sessionSet, clearSession, juFromSlug
} from "../../utils/lsSession";

const MAX_TIME_SNBT = {
  pu: 2250, ppu: 1200, pbm: 1500,
  pk: 1200, lbe: 1200, lbi: 1800, pm: 1200,
};
const MAX_TIME_TKA = {
  matematika: 1800, ipa: 1500, b_indonesia: 1500,
  b_inggris:  1500, ips: 1200, fisika:      1500,
  kimia:      1500, biologi: 1500, ekonomi: 1500,
  geografi:   1500, sejarah: 1500, sosiologi: 1500,
};

function getMaxTime(slug) {
  if (!slug) return null;
  const parts = slug.split("_");
  if (parts[0] === "snbt") return MAX_TIME_SNBT[parts.slice(1, -1).join("_")] ?? null;
  if (parts[0] === "tka")  return MAX_TIME_TKA[parts.slice(2, -1).join("_")]  ?? null;
  return null;
}

function getPathname(slug) {
  return slug?.startsWith("snbt") ? "/form/tolb3r" : "/form/tolb3r";
}

export default function TransitionPage() {
  const router = useRouter();

  useEffect(() => {
    const handleBack = () => history.pushState(null, "", location.href);
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ── Tentukan ju dari slug yang baru selesai ───────────────────────────
    // tolb3r selalu simpan "link" ke global untuk backward compat
    const lastSoal = localStorage.getItem("link");
    const ju       = juFromSlug(lastSoal); // "snbt" | "tka" | null

    if (!ju) { router.push("/"); return; }

    const linkSudah = JSON.parse(sessionGet(ju, "linkSudah") || "[]");
    const dataSoal  = JSON.parse(sessionGet(ju, "dataSoal")  || "[]");
    const nisn      = localStorage.getItem("nisn");
    const name      = localStorage.getItem("name");

    if (!nisn || !name || dataSoal.length === 0) { router.push("/"); return; }

    // Tandai soal yang baru selesai
    if (lastSoal && !linkSudah.includes(lastSoal)) {
      linkSudah.push(lastSoal);
      sessionSet(ju, "linkSudah", JSON.stringify(linkSudah));
    }

    const linkBelum = dataSoal.filter((s) => !linkSudah.includes(s));
    sessionSet(ju, "linkBelum", JSON.stringify(linkBelum));

    if (linkBelum.length === 0) {
      alert("Kamu sudah selesai mengerjakan semua soal, skor nanti akan diumumkan oleh Admin LB3R");
      const linkSudahVal = sessionGet(ju, "linkSudah");
      clearSession(ju);
      if (linkSudahVal) sessionSet(ju, "linkSudah", linkSudahVal);
      // Hapus global "link" agar WarningSnbt tidak tampil lagi
      localStorage.removeItem("link");
      router.push("/");
      return;
    }

    const nextSlug = linkBelum[0];
    sessionSet(ju, "link", nextSlug);

    // Update global "link" agar tolb3r INIT bisa baca
    localStorage.setItem("link", nextSlug);

    const maxTime = getMaxTime(nextSlug);
    if (maxTime) {
      sessionSet(ju, "maxTime", String(maxTime));
      localStorage.setItem("maxTime", String(maxTime)); // backward compat tolb3r
    }

    // startTime per slug (dibaca tolb3r via lsKey(slug, "startTime"))
    const now = new Date().toISOString();
    localStorage.setItem(`${nextSlug}__startTime`, now);

    setTimeout(() => {
      router.push({ pathname: getPathname(nextSlug), query: { link: nextSlug } });
    }, 2000);

  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-lg font-semibold text-gray-700">Memproses soal berikutnya...</p>
    </div>
  );
}