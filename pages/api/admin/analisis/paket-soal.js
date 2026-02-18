// pages/api/admin/analisis/paket-soal.js
// GET /api/admin/analisis/paket-soal?jenis=snbt&paket=01
// Return statistik lengkap parameter soal dari irt_params

// import { createPool } from "../../../../lib/db";
import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { jenis, paket, jenjang } = req.query;

  if (!jenis || !paket) {
    return res.status(400).json({ error: "Parameter jenis dan paket diperlukan" });
  }

  // Validasi jenis
  if (!["snbt", "tka"].includes(jenis)) {
    return res.status(400).json({ error: "Jenis harus 'snbt' atau 'tka'" });
  }

  // Untuk TKA, jenjang wajib
  if (jenis === "tka" && !jenjang) {
    return res.status(400).json({ error: "Jenjang diperlukan untuk TKA" });
  }

//   const pool = createPool();
//   const conn = await pool.getConnection();

  try {
    // Pattern kategori
    const pattern = jenis === "snbt" 
      ? `snbt_%_${paket}` 
      : `tka_${jenjang}_%_${paket}`;

    // Query: ambil semua data IRT params untuk paket ini
    const [rows] = await pool.execute(
      `SELECT kategori, nomor_soal, a, b, kategori_soal, model_irt
       FROM irt_params
       WHERE kategori LIKE ?
       ORDER BY kategori, nomor_soal`,
      [pattern]
    );

    if (rows.length === 0) {
      return res.status(200).json({
        jenis,
        paket,
        jenjang: jenjang || null,
        message: "Belum ada analisis IRT untuk paket ini",
        subtes: [],
      });
    }

    // Grouping by kategori (subtes)
    const subtesMap = {};

    rows.forEach((row) => {
      const { kategori, nomor_soal, a, b, kategori_soal, model_irt } = row;

      if (!subtesMap[kategori]) {
        subtesMap[kategori] = {
          kategori,
          model_irt,
          soal: [],
          stats: {
            total_soal: 0,
            rata_b: 0,
            std_b: 0,
            rata_a: 0,
            distribusi_kesulitan: {},
          },
        };
      }

      subtesMap[kategori].soal.push({
        nomor_soal,
        a: a ? parseFloat(a.toFixed(3)) : null,
        b: parseFloat(b.toFixed(3)),
        kategori_soal,
      });
    });

    // Hitung statistik per subtes
    const subtesList = Object.values(subtesMap).map((subtes) => {
      const { soal } = subtes;
      const total = soal.length;

      // Rata-rata dan std deviasi b
      const bValues = soal.map((s) => s.b);
      const rata_b = bValues.reduce((sum, v) => sum + v, 0) / total;
      const variance = bValues.reduce((sum, v) => sum + Math.pow(v - rata_b, 2), 0) / total;
      const std_b = Math.sqrt(variance);

      // Rata-rata a (jika ada)
      const aValues = soal.filter((s) => s.a !== null).map((s) => s.a);
      const rata_a = aValues.length > 0 
        ? aValues.reduce((sum, v) => sum + v, 0) / aValues.length 
        : null;

      // Distribusi kategori kesulitan
      const distribusi = {};
      soal.forEach((s) => {
        const kat = s.kategori_soal;
        distribusi[kat] = (distribusi[kat] || 0) + 1;
      });

      subtes.stats = {
        total_soal: total,
        rata_b: parseFloat(rata_b.toFixed(3)),
        std_b: parseFloat(std_b.toFixed(3)),
        rata_a: rata_a ? parseFloat(rata_a.toFixed(3)) : null,
        distribusi_kesulitan: distribusi,
      };

      return subtes;
    });

    return res.status(200).json({
      jenis,
      paket,
      jenjang: jenjang || null,
      subtes: subtesList,
    });

  } catch (error) {
    console.error("Error analisis paket soal:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    // pool.release();
    console.log("oke")

  }
}