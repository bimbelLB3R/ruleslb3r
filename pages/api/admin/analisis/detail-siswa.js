// pages/api/admin/analisis/detail-siswa.js
// GET /api/admin/analisis/detail-siswa?jenis=snbt&paket=01&page=1&limit=20&search=...&subtes=...&sort=...
// Return detail skor setiap siswa dengan pagination

// import { createPool } from "../../../../lib/db";
import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const {
    jenis,
    paket,
    jenjang,
    page = 1,
    limit = 20,
    search = "",
    subtes = "",
    sortBy = "ranking",
    sortOrder = "ASC",
  } = req.query;

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
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // ═══ 1. Get list siswa dari irt_scores_total JOIN peserta_snbt ══════
    const conditions = ["t.paket = ?", "t.jenis = ?"];
    const params = [paket, jenis];

    if (search) {
      conditions.push("(t.nisn COLLATE utf8mb4_unicode_ci LIKE ? OR p.nama LIKE ?)");
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern);
    }

    const whereClause = conditions.join(" AND ");

    // Count total
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total
       FROM irt_scores_total t
       LEFT JOIN peserta_snbt p ON t.nisn COLLATE utf8mb4_unicode_ci = p.nisn
       WHERE ${whereClause}`,
      params
    );
    const total = countResult[0].total;

    // Fetch siswa list - nama SELALU dari peserta_snbt
    const allowedSortFields = ["ranking", "skor_total", "nama", "nisn", "jumlah_subtes"];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "ranking";
    const safeSortOrder = sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";

    // Jika sort by nama, gunakan p.nama (dari peserta_snbt)
    const sortField = safeSortBy === "nama" ? "p.nama" : `t.${safeSortBy}`;

    const [siswaRows] = await pool.query(
      `SELECT t.nisn, 
              COALESCE(p.nama, t.nama) as nama,
              t.skor_total, 
              t.ranking, 
              t.jumlah_subtes, 
              t.subtes_selesai
       FROM irt_scores_total t
       LEFT JOIN peserta_snbt p ON t.nisn COLLATE utf8mb4_unicode_ci = p.nisn
       WHERE ${whereClause}
       ORDER BY ${sortField} ${safeSortOrder}
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    if (siswaRows.length === 0) {
      return res.status(200).json({
        data: [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 0,
          totalPages: 0,
        },
      });
    }

    // ═══ 2. Get skor per subtes untuk setiap siswa ═══════════════════════
    const nisnList = siswaRows.map((s) => s.nisn);
    const pattern = jenis === "snbt" 
      ? `snbt_%_${paket}` 
      : `tka_${jenjang}_%_${paket}`;

    const [scoresRows] = await pool.query(
      `SELECT nisn, kategori, score_1000, total_benar
       FROM irt_scores
       WHERE nisn IN (${nisnList.map(() => '?').join(',')})
         AND kategori LIKE ?
       ORDER BY kategori`,
      [...nisnList, pattern]
    );

    // Group scores by nisn
    const scoresMap = {};
    scoresRows.forEach((row) => {
      if (!scoresMap[row.nisn]) scoresMap[row.nisn] = [];
      scoresMap[row.nisn].push({
        kategori: row.kategori,
        skor: parseFloat((Number(row.score_1000) || 0).toFixed(1)),
        benar: row.total_benar,
      });
    });

    // ═══ 3. Combine data ══════════════════════════════════════════════════
    const result = siswaRows.map((siswa) => ({
      nisn: siswa.nisn,
      nama: siswa.nama,
      skor_total: parseFloat((Number(siswa.skor_total) || 0).toFixed(1)),
      ranking: siswa.ranking,
      jumlah_subtes: siswa.jumlah_subtes,
      subtes_selesai: siswa.subtes_selesai,
      detail_subtes: scoresMap[siswa.nisn] || [],
    }));

    // ═══ 4. Filter by subtes jika ada ════════════════════════════════════
    let filteredResult = result;
    if (subtes) {
      filteredResult = result.filter((siswa) =>
        siswa.detail_subtes.some((s) => s.kategori.includes(subtes))
      );
    }

    return res.status(200).json({
      data: filteredResult,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: subtes ? filteredResult.length : total,
        totalPages: Math.ceil((subtes ? filteredResult.length : total) / parseInt(limit)),
      },
    });

  } catch (error) {
    console.error("Error detail siswa:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    // pool.release();
    console.log("oke")
  }
}