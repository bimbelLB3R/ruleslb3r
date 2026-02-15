// pages/api/analisis/subtes.js
// GET /api/analisis/subtes?kategori=snbt_pu_01
//
// Return: statistik subtes, ranking siswa, distribusi kategori, parameter soal

import pool from "../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { kategori } = req.query;

  if (!kategori || !kategori.match(/^(snbt|tka)_\w+_\d{2}$/))
    return res.status(400).json({ error: "Parameter kategori tidak valid" });

  try {
    const conn = await pool.getConnection();

    // 1. Statistik umum subtes
    const [[stats]] = await conn.query(
      `SELECT
         COUNT(*)                          AS total_siswa,
         ROUND(AVG(score_1000), 2)        AS rata_score,
         ROUND(MAX(score_1000), 2)        AS score_tertinggi,
         ROUND(MIN(score_1000), 2)        AS score_terendah,
         ROUND(STDDEV(score_1000), 2)     AS std_dev,
         ROUND(AVG(total_benar), 2)       AS rata_benar
       FROM irt_scores
       WHERE kategori = ?`,
      [kategori]
    );

    if (!stats.total_siswa) {
      conn.release();
      return res.status(404).json({
        error: "Belum ada data analisis untuk kategori ini. Jalankan analisis_irt.py terlebih dahulu."
      });
    }

    // 2. Ranking siswa (top semua, diurutkan skor)
    const [siswa] = await conn.query(
      `SELECT
         nisn, nama, score_1000, total_benar, F1, kategori_siswa,
         RANK() OVER (ORDER BY score_1000 DESC) AS ranking
       FROM irt_scores
       WHERE kategori = ?
       ORDER BY score_1000 DESC`,
      [kategori]
    );

    // 3. Distribusi kategori siswa
    const [distribusiSiswa] = await conn.query(
      `SELECT kategori_siswa, COUNT(*) AS jumlah
       FROM irt_scores
       WHERE kategori = ?
       GROUP BY kategori_siswa
       ORDER BY FIELD(
         kategori_siswa,
         'Sangat Tinggi','Tinggi','Cukup Tinggi','Sedang',
         'Cukup Rendah','Rendah','Sangat Rendah'
       )`,
      [kategori]
    );

    // 4. Parameter soal (distribusi kesulitan)
    const [paramSoal] = await conn.query(
      `SELECT nomor_soal, a, b, kategori_soal
       FROM irt_params
       WHERE kategori = ?
       ORDER BY nomor_soal`,
      [kategori]
    );

    // 5. Distribusi kategori soal
    const [distribusiSoal] = await conn.query(
      `SELECT kategori_soal, COUNT(*) AS jumlah
       FROM irt_params
       WHERE kategori = ?
       GROUP BY kategori_soal
       ORDER BY FIELD(
         kategori_soal,
         'Sangat Mudah','Mudah','Cukup Mudah','Biasa',
         'Cukup Sulit','Sulit','Sangat Sulit','Unknown'
       )`,
      [kategori]
    );

    conn.release();

    return res.status(200).json({
      kategori,
      stats,
      siswa,
      distribusiSiswa,
      paramSoal,
      distribusiSoal,
    });

  } catch (err) {
    console.error("API analisis/subtes error:", err);
    return res.status(500).json({ error: "Database error" });
  }
}