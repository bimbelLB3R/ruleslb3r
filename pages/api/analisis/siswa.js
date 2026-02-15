// pages/api/analisis/siswa.js
// GET /api/analisis/siswa?nisn=xxx&paket=01
//
// Return: skor semua subtes siswa + skor total + ranking

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

function subtesKey(kategori) {
  // "snbt_pu_01" → "snbt_pu"
  const parts = kategori.split("_");
  return parts.slice(0, 2).join("_");
}

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { nisn, paket = "01" } = req.query;

  if (!nisn)
    return res.status(400).json({ error: "Parameter nisn wajib diisi" });

  try {
    const conn = await pool.getConnection();

    // 1. Skor per subtes siswa ini
    const [subtesSkor] = await conn.query(
      `SELECT
         s.kategori,
         s.score_1000,
         s.total_benar,
         s.F1,
         s.kategori_siswa
       FROM irt_scores s
       WHERE s.nisn = ?
         AND s.kategori LIKE ?
       ORDER BY s.kategori`,
      [nisn, `snbt_%_${paket}`]
    );

    if (!subtesSkor.length) {
      conn.release();
      return res.status(404).json({
        error: "Data siswa tidak ditemukan atau belum ada analisis IRT.",
        nisn,
        paket,
      });
    }

    // Tambahkan label subtes
    const subtesDetail = subtesSkor.map((s) => ({
      ...s,
      label: LABEL_SUBTES[subtesKey(s.kategori)] ?? s.kategori,
    }));

    // 2. Skor total siswa (dari irt_scores_total)
    const [[skorTotal]] = await conn.query(
      `SELECT
         t.skor_total,
         t.jumlah_subtes,
         t.subtes_selesai,
         t.ranking,
         (SELECT COUNT(*) FROM irt_scores_total WHERE paket = ?) AS total_peserta
       FROM irt_scores_total t
       WHERE t.nisn = ? AND t.paket = ?`,
      [paket, nisn, paket]
    );

    // 3. Info siswa dari peserta_snbt
    const [[infoPeserta]] = await conn.query(
      `SELECT nama, asalsekolah FROM peserta_snbt WHERE nisn = ?`,
      [nisn]
    );

    // 4. Ranking per subtes (posisi siswa dibanding siswa lain)
    const rankingPerSubtes = {};
    for (const s of subtesSkor) {
      const [[rank]] = await conn.query(
        `SELECT
           (SELECT COUNT(*) + 1 FROM irt_scores
            WHERE kategori = ? AND score_1000 > ?) AS ranking,
           (SELECT COUNT(*) FROM irt_scores WHERE kategori = ?) AS total
         `,
        [s.kategori, s.score_1000, s.kategori]
      );
      rankingPerSubtes[s.kategori] = rank;
    }

    conn.release();

    return res.status(200).json({
      nisn,
      paket,
      peserta:       infoPeserta ?? null,
      subtesDetail,
      skorTotal:     skorTotal ?? null,
      rankingSubtes: rankingPerSubtes,
    });

  } catch (err) {
    console.error("API analisis/siswa error:", err);
    return res.status(500).json({ error: "Database error" });
  }
}