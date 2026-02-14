import pool from "../../../../libs/dbaws";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// "snbt_pu_01"            → soal_snbt
// "tka_smp_matematika_01" → soal_tka
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
  if (prefix === "snbt") return parts.length >= 3; // snbt_{subtes}_{paket}
  if (prefix === "tka")  return parts.length >= 4; // tka_{jenjang}_{subtes}_{paket}
  return false;
}

// Ekstrak jenjang dari slug TKA: "tka_smp_matematika_01" → "smp"
function getJenjangFromSlug(slug = "") {
  return slug.split("_")[1] ?? null; // sd | smp | sma
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { kategori, ...soalData } = req.body;

  if (!isValidSlug(kategori)) {
    return res.status(400).json({ error: "Invalid kategori slug" });
  }

  const table = getTableFromSlug(kategori);
  if (!table) {
    return res.status(400).json({ error: "Kategori tidak dikenali" });
  }

  // Susun payload — tambah kolom jenjang khusus soal_tka
  const payload = {
    ...soalData,
    kategori,
    ...(table === "soal_tka" && { jenjang: getJenjangFromSlug(kategori) }),
  };

  try {
    const fields       = Object.keys(payload).join(", ");
    const placeholders = Object.keys(payload).map(() => "?").join(", ");
    const values       = Object.values(payload);

    const [result] = await pool.query(
      `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`,
      values
    );

    return res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Soal berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error" });
  }
}