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
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, kategori, ...soalData } = req.body;

  if (!isValidSlug(kategori) || !id) {
    return res.status(400).json({ error: "Invalid kategori slug or id" });
  }

  const table = getTableFromSlug(kategori);
  if (!table) {
    return res.status(400).json({ error: "Kategori tidak dikenali" });
  }

  if (Object.keys(soalData).length === 0) {
    return res.status(400).json({ error: "Tidak ada data untuk diupdate" });
  }

  // Untuk soal_tka, pastikan jenjang ikut diupdate jika kategori berubah
  const updatePayload = {
    ...soalData,
    ...(table === "soal_tka" && { jenjang: kategori.split("_")[1] ?? null }),
  };

  try {
    const setClauses = Object.keys(updatePayload)
      .map((key) => `${key} = ?`)
      .join(", ");

    await pool.query(
      `UPDATE ${table} SET ${setClauses} WHERE id = ? AND kategori = ?`,
      [...Object.values(updatePayload), id, kategori]
    );

    return res.status(200).json({
      success: true,
      message: "Soal berhasil diupdate",
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
}