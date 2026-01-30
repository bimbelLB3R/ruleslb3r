import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, kategori } = req.body;

  const validKategori = [
    "snbt",
    "kuantitatif",
    "matematika",
    "english",
    "bacaan",
    "penalaran",
    "pengetahuan",
  ];

  if (!id || !validKategori.includes(kategori)) {
    return res.status(400).json({ error: "Invalid id or kategori" });
  }

  try {
    // Ambil nomor soal terakhir
    const [[last]] = await pool.query(
      `SELECT MAX(nomor_soal) as maxNomor FROM ${kategori}`
    );

    const newNomor = (last?.maxNomor || 0) + 1;

    // Duplikat record (kecuali id & timestamp)
    const sql = `
      INSERT INTO ${kategori} (
        nomor_soal,
        kategori_soal,
        judul_text1,
        bacaan_1, bacaan_2, bacaan_3, bacaan_4, bacaan_5,
        bacaan_6, bacaan_7, bacaan_8, bacaan_9, bacaan_10,
        bacaan_11, bacaan_12, bacaan_13, bacaan_14, bacaan_15, bacaan_16,
        link_gambar,
        soal,
        typeOpsi,
        inner_html,
        pilihan_a, pilihan_a_img,
        pilihan_b, pilihan_b_img,
        pilihan_c, pilihan_c_img,
        pilihan_d, pilihan_d_img,
        pilihan_e, pilihan_e_img,
        pernyataan_1, pernyataan_1_img,
        pernyataan_2, pernyataan_2_img,
        pernyataan_3, pernyataan_3_img,
        pernyataan_4, pernyataan_4_img,
        pernyataan_5, pernyataan_5_img,
        kunci_jawaban
      )
      SELECT
        ?,  -- nomor_soal baru
        kategori_soal,
        judul_text1,
        bacaan_1, bacaan_2, bacaan_3, bacaan_4, bacaan_5,
        bacaan_6, bacaan_7, bacaan_8, bacaan_9, bacaan_10,
        bacaan_11, bacaan_12, bacaan_13, bacaan_14, bacaan_15, bacaan_16,
        link_gambar,
        NULL,
        typeOpsi,
        inner_html,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL, NULL,
        NULL
      FROM ${kategori}
      WHERE id = ?
      LIMIT 1
    `;

    const [result] = await pool.query(sql, [newNomor, id]);

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
