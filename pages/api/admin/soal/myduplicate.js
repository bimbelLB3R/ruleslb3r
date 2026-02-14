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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, kategori } = req.body;

  if (!id || !isValidSlug(kategori)) {
    return res.status(400).json({ error: "Invalid id atau kategori slug" });
  }

  const table = getTableFromSlug(kategori);
  if (!table) {
    return res.status(400).json({ error: "Kategori tidak dikenali" });
  }

  try {
    // Ambil nomor soal terakhir di slug yang sama (bukan seluruh tabel)
    const [[last]] = await pool.query(
      `SELECT MAX(nomor_soal) AS maxNomor FROM ${table} WHERE kategori = ?`,
      [kategori]
    );

    const newNomor = (last?.maxNomor ?? 0) + 1;

    // Duplikat record, kosongkan soal & semua opsi jawaban agar admin isi ulang
    const sql = `
      INSERT INTO ${table} (
        kategori,
        nomor_soal,
        kategori_soal,
        judul_text1,
        bacaan_1,  bacaan_2,  bacaan_3,  bacaan_4,  bacaan_5,
        bacaan_6,  bacaan_7,  bacaan_8,  bacaan_9,  bacaan_10,
        bacaan_11, bacaan_12, bacaan_13, bacaan_14, bacaan_15, bacaan_16,
        link_gambar,
        soal,
        typeOpsi,
        inner_html,
        pilihan_a,   pilihan_a_img,
        pilihan_b,   pilihan_b_img,
        pilihan_c,   pilihan_c_img,
        pilihan_d,   pilihan_d_img,
        pilihan_e,   pilihan_e_img,
        pernyataan_1, pernyataan_1_img,
        pernyataan_2, pernyataan_2_img,
        pernyataan_3, pernyataan_3_img,
        pernyataan_4, pernyataan_4_img,
        pernyataan_5, pernyataan_5_img,
        kunci_jawaban
      )
      SELECT
        kategori,
        ?,           -- nomor_soal baru
        kategori_soal,
        judul_text1,
        bacaan_1,  bacaan_2,  bacaan_3,  bacaan_4,  bacaan_5,
        bacaan_6,  bacaan_7,  bacaan_8,  bacaan_9,  bacaan_10,
        bacaan_11, bacaan_12, bacaan_13, bacaan_14, bacaan_15, bacaan_16,
        link_gambar,
        soal,        -- salin teks soal
        typeOpsi,
        inner_html,
        NULL, NULL,  -- pilihan_a & img dikosongkan
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,  -- pernyataan dikosongkan
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        '-'         -- kunci_jawaban dikosongkan
      FROM ${table}
      WHERE id = ? AND kategori = ?
      LIMIT 1
    `;

    const [result] = await pool.query(sql, [newNomor, id, kategori]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Soal sumber tidak ditemukan" });
    }

    return res.status(200).json({
      success: true,
      message: "Soal berhasil diduplikat",
      newId: result.insertId,
      nomor_soal: newNomor,
    });
  } catch (error) {
    console.error("Duplicate error:", error);
    return res.status(500).json({ error: "Database error" });
  }
}