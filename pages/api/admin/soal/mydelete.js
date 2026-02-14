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
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, kategori } = req.query;

  if (!isValidSlug(kategori) || !id) {
    return res.status(400).json({ error: "Invalid kategori slug or id" });
  }

  const table = getTableFromSlug(kategori);
  if (!table) {
    return res.status(400).json({ error: "Kategori tidak dikenali" });
  }

  try {
    // Sertakan kategori di WHERE agar tidak bisa hapus soal lintas paket/jenjang
    const [result] = await pool.query(
      `DELETE FROM ${table} WHERE id = ? AND kategori = ?`,
      [id, kategori]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Soal tidak ditemukan" });
    }

    return res.status(200).json({
      success: true,
      message: "Soal berhasil dihapus",
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
}