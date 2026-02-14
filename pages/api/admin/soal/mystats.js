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

  const { kategori } = req.query;

  if (!isValidSlug(kategori)) {
    return res.status(400).json({ error: "Invalid kategori slug" });
  }

  const table = getTableFromSlug(kategori);
  if (!table) {
    return res.status(400).json({ error: "Kategori tidak dikenali" });
  }

  try {
    const [[row]] = await pool.query(
      `SELECT COUNT(*) AS total FROM ${table} WHERE kategori = ?`,
      [kategori]
    );

    return res.status(200).json({
      total: row.total,
      kategori,
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
}