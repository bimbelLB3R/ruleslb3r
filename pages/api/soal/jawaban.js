// /api/soal/jawaban.js
// POST /api/soal/jawaban
//
// Body: {
//   kategori : "snbt_pu_01" | "tka_sma_matematika_01"  ← slug paket soal
//   nisn     : "1234567890"
//   nama     : "Budi"
//   j_1      : "A", j_2: "B", ... j_n: "C"            ← jawaban per nomor
// }

import pool from "../../../libs/dbaws";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidSlug(slug = "") {
  if (!slug) return false;
  const parts = slug.split("_");
  const prefix = parts[0];
  if (prefix === "snbt") return parts.length >= 3;
  if (prefix === "tka")  return parts.length >= 4;
  return false;
}

// slug → nama tabel lembar jawaban
// "snbt_pu_01"            → jwb_snbt
// "tka_sma_matematika_01" → jwb_tka
function getJwbTableFromSlug(slug = "") {
  const prefix = slug.split("_")[0];
  if (prefix === "snbt") return "jwb_snbtcf";
  if (prefix === "tka")  return "jwb_tka";
  return null;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { kategori, nisn, nama, ...jawaban } = req.body;

  // Validasi input wajib
  if (!isValidSlug(kategori)) {
    return res.status(400).json({ error: "Invalid kategori slug" });
  }
  if (!nisn) {
    return res.status(400).json({ error: "NISN wajib diisi" });
  }

  const tableName = getJwbTableFromSlug(kategori);
  if (!tableName) {
    return res.status(400).json({ error: "Kategori tidak dikenali" });
  }

  // Payload lengkap yang akan disimpan
  // kategori disimpan di lembar jawaban agar bisa difilter per paket saat koreksi
  const payload = { nisn, nama: nama ?? "", kategori, ...jawaban };

  try {
    // Cek apakah siswa sudah pernah submit untuk paket ini
    const [existing] = await pool.query(
      `SELECT id FROM ${tableName} WHERE nisn = ? AND kategori = ? LIMIT 1`,
      [nisn, kategori]
    );

    if (existing.length > 0) {
      // ── UPDATE: siswa submit ulang (misal koneksi putus lalu kirim lagi) ──
      const setClauses = Object.keys(payload)
        .filter((k) => k !== "nisn" && k !== "kategori")
        .map((k) => `${k} = ?`)
        .join(", ");

      const values = [
        ...Object.keys(payload)
          .filter((k) => k !== "nisn" && k !== "kategori")
          .map((k) => payload[k]),
        nisn,
        kategori,
      ];

      await pool.query(
        `UPDATE ${tableName} SET ${setClauses} WHERE nisn = ? AND kategori = ?`,
        values
      );

      return res.status(200).json({
        success: true,
        message: "Jawaban diperbarui",
        action: "update",
      });
    } else {
      // ── INSERT: pengiriman pertama ────────────────────────────────────────
      const fields       = Object.keys(payload).join(", ");
      const placeholders = Object.keys(payload).map(() => "?").join(", ");
      const values       = Object.values(payload);

      await pool.query(
        `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`,
        values
      );

      return res.status(201).json({
        success: true,
        message: "Jawaban berhasil dikirim",
        action: "insert",
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
}


