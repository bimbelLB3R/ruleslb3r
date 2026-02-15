// pages/api/analisis/ringkasan.js
// GET /api/analisis/ringkasan?paket=01
//
// Return: perbandingan rata-rata score_1000 antar subtes + top siswa keseluruhan

import pool from "../../../libs/dbaws";

const LABEL_SUBTES = {
  snbt_pu:  "Penalaran Umum",
  snbt_lbi: "Literasi Bahasa Indonesia",
  snbt_pbm: "Pemahaman Bacaan & Menulis",
  snbt_pk:  "Pengetahuan Kuantitatif",
  snbt_lbe: "Literasi Bahasa Inggris",
  snbt_pm:  "Penalaran Matematika",
  snbt_ppu: "Pengetahuan & Pemahaman Umum",
};

const URUTAN_SUBTES = ["pu", "lbi", "pbm", "pk", "lbe", "pm", "ppu"];

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { paket = "01" } = req.query;

  try {
    const conn = await pool.getConnection();

    // 1. Statistik per subtes — diurutkan sesuai URUTAN_SUBTES
    const [perSubtes] = await conn.query(
      `SELECT
         kategori,
         COUNT(*)                         AS total_siswa,
         ROUND(AVG(score_1000), 2)       AS rata_score,
         ROUND(MAX(score_1000), 2)       AS score_max,
         ROUND(MIN(score_1000), 2)       AS score_min,
         ROUND(STDDEV(score_1000), 2)    AS std_dev,
         ROUND(AVG(total_benar), 2)      AS rata_benar
       FROM irt_scores
       WHERE kategori LIKE ?
       GROUP BY kategori`,
      [`snbt_%_${paket}`]
    );

    if (!perSubtes.length) {
      conn.release();
      return res.status(404).json({
        error: `Belum ada data analisis untuk paket ${paket}.`,
      });
    }

    // Tambahkan label dan urutkan
    const perSubtesLabeled = perSubtes
      .map((s) => {
        const key = s.kategori.split("_").slice(0, 2).join("_"); // snbt_pu
        return { ...s, label: LABEL_SUBTES[key] ?? s.kategori };
      })
      .sort((a, b) => {
        const ai = URUTAN_SUBTES.indexOf(a.kategori.split("_")[1]);
        const bi = URUTAN_SUBTES.indexOf(b.kategori.split("_")[1]);
        return ai - bi;
      });

    // 2. Top 10 siswa berdasarkan skor total
    const [topSiswa] = await conn.query(
      `SELECT
         nisn, nama, skor_total, jumlah_subtes,
         subtes_selesai, ranking
       FROM irt_scores_total
       WHERE paket = ?
       ORDER BY skor_total DESC
       LIMIT 10`,
      [paket]
    );

    // 3. Distribusi kategori siswa gabungan (semua subtes)
    const [distribusiGabungan] = await conn.query(
      `SELECT
         kategori_siswa,
         COUNT(*) AS jumlah
       FROM irt_scores
       WHERE kategori LIKE ?
       GROUP BY kategori_siswa
       ORDER BY FIELD(
         kategori_siswa,
         'Sangat Tinggi','Tinggi','Cukup Tinggi','Sedang',
         'Cukup Rendah','Rendah','Sangat Rendah'
       )`,
      [`snbt_%_${paket}`]
    );

    // 4. Subtes termudah vs tersulit (berdasarkan rata-rata skor)
    const sorted = [...perSubtesLabeled].sort((a, b) => b.rata_score - a.rata_score);
    const subtesMudah  = sorted[0]  ?? null;
    const subtesSublit = sorted[sorted.length - 1] ?? null;

    // 5. Statistik global paket
    const [[globalStats]] = await conn.query(
      `SELECT
         COUNT(DISTINCT nisn)          AS total_siswa_unik,
         ROUND(AVG(skor_total), 2)    AS rata_skor_total,
         ROUND(MAX(skor_total), 2)    AS skor_total_tertinggi,
         ROUND(MIN(skor_total), 2)    AS skor_total_terendah
       FROM irt_scores_total
       WHERE paket = ?`,
      [paket]
    );

    conn.release();

    return res.status(200).json({
      paket,
      globalStats,
      perSubtes:        perSubtesLabeled,
      topSiswa,
      distribusiGabungan,
      insight: {
        subtes_termudah: subtesMudah  ? `${subtesMudah.label} (rata-rata ${subtesMudah.rata_score})` : null,
        subtes_tersulit: subtesSublit ? `${subtesSublit.label} (rata-rata ${subtesSublit.rata_score})` : null,
        subtes_selesai:  perSubtesLabeled.length,
        total_subtes:    7,
      },
    });

  } catch (err) {
    console.error("API analisis/ringkasan error:", err);
    return res.status(500).json({ error: "Database error" });
  }
}