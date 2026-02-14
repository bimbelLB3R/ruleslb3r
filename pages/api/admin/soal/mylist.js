import pool from "../../../../libs/dbaws";

function getTableFromSlug(slug = "") {
  const prefix = slug.split("_")[0];
  if (prefix === "snbt") return "soal_snbt";
  if (prefix === "tka")  return "soal_tka";
  return null;
}

function isValidSlug(slug = "") {
  if (!slug) return false;
  const parts = slug.split("_");
  const prefix = parts[0];
  if (prefix === "snbt") return parts.length >= 3;
  if (prefix === "tka")  return parts.length >= 4;
  return false;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { kategori, page = 1, limit = 20 } = req.query;

  if (!isValidSlug(kategori)) {
    return res.status(400).json({ error: "Invalid kategori slug" });
  }

  const table = getTableFromSlug(kategori);
  if (!table) {
    return res.status(400).json({ error: "Kategori tidak dikenali" });
  }

  try {
    const pageInt  = Math.max(1, parseInt(page));
    const limitInt = Math.min(100, Math.max(1, parseInt(limit)));
    const offset   = (pageInt - 1) * limitInt;

    const [rows] = await pool.query(
      `SELECT * FROM ${table}
       WHERE kategori = ?
       ORDER BY nomor_soal ASC
       LIMIT ? OFFSET ?`,
      [kategori, limitInt, offset]
    );

    const [[countRow]] = await pool.query(
      `SELECT COUNT(*) AS total FROM ${table} WHERE kategori = ?`,
      [kategori]
    );

    const total = countRow.total;

    return res.status(200).json({
      data: rows,
      pagination: {
        page: pageInt,
        limit: limitInt,
        total,
        totalPages: Math.ceil(total / limitInt),
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
}