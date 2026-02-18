// utils/lsSession.js
import dayjs from "dayjs";

export const SESSION_KEYS = [
  "link", "dataSoal", "linkSudah", "linkBelum",
  "maxTime", "paket",
  "subtesAwal", "subtesAwalTka", "jenjang", "mapelPilihanSiswa",
];
export const JENIS_UJIAN = ["snbt", "tka"];

export function sessionKey(ju, key) { return `${ju}__${key}`; }

export function sessionGet(ju, key) {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(sessionKey(ju, key));
}
export function sessionSet(ju, key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(sessionKey(ju, key), String(value));
}
export function sessionRemove(ju, key) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(sessionKey(ju, key));
}

// ─── Hapus semua key slug (startTime, timeUp, jumlahSoal, dll) ───────────────
// Dipanggil saat reset atau saat semua subtes selesai
export function clearAllSlugKeys(ju) {
  if (typeof window === "undefined") return;
  
  // Ambil daftar slug dari dataSoal
  const dataSoalRaw = sessionGet(ju, "dataSoal");
  if (!dataSoalRaw) return;
  
  try {
    const dataSoal = JSON.parse(dataSoalRaw);
    dataSoal.forEach((slug) => {
      // Hapus semua key yang dimulai dengan slug__
      const keysToDelete = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`${slug}__`)) {
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach((k) => localStorage.removeItem(k));
    });
  } catch (err) {
    console.error("clearAllSlugKeys error:", err);
  }
}

export function clearSession(ju) {
  if (typeof window === "undefined") return;
  // Hapus juga semua key slug milik dataSoal
  clearAllSlugKeys(ju);
  SESSION_KEYS.forEach((k) => localStorage.removeItem(sessionKey(ju, k)));
  
  
}

export function juFromSlug(slug) {
  if (!slug) return null;
  const prefix = slug.split("_")[0];
  return JENIS_UJIAN.includes(prefix) ? prefix : null;
}

// ─── Cari sesi yang perlu ditangani ──────────────────────────────────────────
// Return { ju, link, remaining, isTimeUp } atau null
//
// Kondisi A — remaining > 0       : sesi aktif, waktu masih ada
// Kondisi B — remaining = 0 AND   : waktu habis, jawaban BELUM dikirim
//             timeUp flag = "1"     (flag ditulis tolb3r saat handleTimeUp)
//
// Kondisi B diprioritaskan — harus diselesaikan dulu sebelum ujian baru

export function getActiveSesi() {
  if (typeof window === "undefined") return null;

  let best = null;

  for (const ju of JENIS_UJIAN) {
    const link          = sessionGet(ju, "link");
    const storedMaxTime = sessionGet(ju, "maxTime");
    if (!link || !storedMaxTime) continue;

    // Cek kondisi B dulu: timeUp flag ada tanpa perlu startTime
    const timeUpFlag = localStorage.getItem(`${link}__timeUp`);
    if (timeUpFlag === "1") {
      return { ju, link, remaining: 0, isTimeUp: true };
    }

    // Cek kondisi A: startTime ada dan waktu masih sisa
    const startTimeRaw = localStorage.getItem(`${link}__startTime`);
    if (!startTimeRaw) continue;

    const remaining = Math.max(
      0,
      parseInt(storedMaxTime) - dayjs().diff(dayjs(startTimeRaw), "second")
    );

    if (remaining > 0 && (!best || remaining > best.remaining)) {
      best = { ju, link, remaining, isTimeUp: false };
    }
  }

  return best;
}