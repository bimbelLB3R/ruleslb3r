// pages/api/admin/analisis/hasil-siswa.js
// GET /api/admin/analisis/hasil-siswa?jenis=snbt&paket=01
// Return statistik skor siswa dari irt_scores dan irt_scores_total

// import { createPool } from "../../../../lib/db";
import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { jenis, paket, jenjang } = req.query;

  if (!jenis || !paket) {
    return res.status(400).json({ error: "Parameter jenis dan paket diperlukan" });
  }

  if (!["snbt", "tka"].includes(jenis)) {
    return res.status(400).json({ error: "Jenis harus 'snbt' atau 'tka'" });
  }

  if (jenis === "tka" && !jenjang) {
    return res.status(400).json({ error: "Jenjang diperlukan untuk TKA" });
  }

//   const pool = createPool();
//   const conn = await pool.getConnection();

  try {
    // ═══ 1. Skor Total ═══════════════════════════════════════════════════
    const [totalRows] = await pool.execute(
      `SELECT COUNT(*) as jumlah_siswa,
              AVG(skor_total) as rata_skor,
              MIN(skor_total) as skor_min,
              MAX(skor_total) as skor_max,
              STDDEV(skor_total) as std_skor
       FROM irt_scores_total
       WHERE paket = ? AND jenis = ?`,
      [paket, jenis]
    );

    const statsTotal = totalRows[0];

    // ═══ 2. Skor Per Subtes ══════════════════════════════════════════════
    const pattern = jenis === "snbt" 
      ? `snbt_%_${paket}` 
      : `tka_${jenjang}_%_${paket}`;

    const [subtesRows] = await pool.execute(
      `SELECT kategori,
              COUNT(*) as jumlah_siswa,
              AVG(score_1000) as rata_skor,
              MIN(score_1000) as skor_min,
              MAX(score_1000) as skor_max,
              STDDEV(score_1000) as std_skor,
              AVG(total_benar) as rata_benar
       FROM irt_scores
       WHERE kategori LIKE ?
       GROUP BY kategori
       ORDER BY kategori`,
      [pattern]
    );

    const statsSubtes = subtesRows.map((row) => ({
      kategori: row.kategori,
      jumlah_siswa: row.jumlah_siswa,
      rata_skor: parseFloat((Number(row.rata_skor) || 0).toFixed(2)),
      skor_min: parseFloat((Number(row.skor_min) || 0).toFixed(2)),
      skor_max: parseFloat((Number(row.skor_max) || 0).toFixed(2)),
      std_skor: parseFloat((Number(row.std_skor) || 0).toFixed(2)),
      rata_benar: parseFloat((Number(row.rata_benar) || 0).toFixed(2)),
    }));

    // ═══ 3. Distribusi Kategori Siswa ════════════════════════════════════
    const [kategoriRows] = await pool.execute(
      `SELECT kategori_siswa, COUNT(*) as jumlah
       FROM irt_scores
       WHERE kategori LIKE ?
       GROUP BY kategori_siswa
       ORDER BY 
         CASE kategori_siswa
           WHEN 'Sangat Tinggi' THEN 1
           WHEN 'Tinggi' THEN 2
           WHEN 'Cukup Tinggi' THEN 3
           WHEN 'Sedang' THEN 4
           WHEN 'Cukup Rendah' THEN 5
           WHEN 'Rendah' THEN 6
           WHEN 'Sangat Rendah' THEN 7
         END`,
      [pattern]
    );

    const distribusiKategori = kategoriRows.reduce((acc, row) => {
      acc[row.kategori_siswa] = row.jumlah;
      return acc;
    }, {});

    // ═══ 4. Top 10 Siswa ══════════════════════════════════════════════════
    const [topRows] = await pool.execute(
      `SELECT nisn, nama, skor_total, ranking, jumlah_subtes
       FROM irt_scores_total
       WHERE paket = ? AND jenis = ?
       ORDER BY skor_total DESC
       LIMIT 10`,
      [paket, jenis]
    );

    return res.status(200).json({
      jenis,
      paket,
      jenjang: jenjang || null,
      stats_total: {
        jumlah_siswa: statsTotal.jumlah_siswa || 0,
        rata_skor: parseFloat((Number(statsTotal.rata_skor) || 0).toFixed(2)),
        skor_min: parseFloat((Number(statsTotal.skor_min) || 0).toFixed(2)),
        skor_max: parseFloat((Number(statsTotal.skor_max) || 0).toFixed(2)),
        std_skor: parseFloat((Number(statsTotal.std_skor) || 0).toFixed(2)),
      },
      stats_subtes: statsSubtes,
      distribusi_kategori: distribusiKategori,
      top_10: topRows,
    });

  } catch (error) {
    console.error("Error analisis hasil siswa:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    // pool.release();
    console.log("oke")
  }
}