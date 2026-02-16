// pages/api/hasil/profil.js
// GET /api/hasil/profil?email=...
// Lookup nisn dari email, cek apakah punya data SNBT/TKA di irt_scores

import { createPool } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "email diperlukan" });

  const pool = createPool();
  const conn = await pool.getConnection();

  try {
    // 1. Cari nisn dari email
    const [peserta] = await conn.execute(
      "SELECT nisn, nama FROM peserta_snbt WHERE email = ? LIMIT 1",
      [email]
    );

    if (peserta.length === 0) {
      return res.status(404).json({ terdaftar: false });
    }

    const { nisn, nama } = peserta[0];

    // 2. Cek apakah punya data irt_scores untuk SNBT dan/atau TKA
    const [cekSnbt] = await conn.execute(
      "SELECT COUNT(*) as total FROM irt_scores WHERE nisn = ? AND kategori LIKE 'snbt_%' LIMIT 1",
      [nisn]
    );
    const [cekTka] = await conn.execute(
      "SELECT COUNT(*) as total FROM irt_scores WHERE nisn = ? AND kategori LIKE 'tka_%' LIMIT 1",
      [nisn]
    );

    return res.status(200).json({
      terdaftar: true,
      nisn,
      nama,
      hasSnbt: cekSnbt[0].total > 0,
      hasTka:  cekTka[0].total  > 0,
    });

  } finally {
    conn.release();
  }
}