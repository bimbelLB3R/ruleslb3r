// pages/api/admin/soal/siswa-count.js
// GET /api/admin/soal/siswa-count?kategori=snbt_pu_01
// Menghitung jumlah siswa UNIK yang sudah mengerjakan kategori soal tertentu

// import { createPool } from "../../../../lib/dbaws";
import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { kategori } = req.query;

  if (!kategori) {
    return res.status(400).json({ error: "Parameter kategori diperlukan" });
  }

  // Tentukan jenis ujian dari prefix kategori
  const jenis = kategori.startsWith("snbt") ? "snbt" : 
                kategori.startsWith("tka")  ? "tka"  : null;

  if (!jenis) {
    return res.status(400).json({ error: "Kategori tidak valid" });
  }

//   const pool = createPool();
//   const conn = await pool.getConnection();

  try {
    // Query: hitung jumlah NISN unik yang punya jawaban di kategori ini
    const tabelJawaban = jenis === "snbt" ? "jwb_snbtcf" : "jwb_tka";

    const [result] = await pool.execute(
      `SELECT COUNT(DISTINCT nisn) as jumlah_siswa
       FROM ${tabelJawaban}
       WHERE kategori = ?`,
      [kategori]
    );

    const jumlahSiswa = result[0]?.jumlah_siswa ?? 0;

    return res.status(200).json({
      kategori,
      jenis,
      jumlah_siswa: jumlahSiswa,
    });

  } catch (error) {
    console.error("Error counting siswa:", error);
    return res.status(500).json({ error: "Gagal menghitung jumlah siswa" });
  } finally {
    pool.release();
  }
}