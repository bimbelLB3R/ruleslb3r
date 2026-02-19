// pages/api/admin/analisis/jawaban-siswa.js
// GET /api/admin/analisis/jawaban-siswa?kategori=snbt_pu_01&nisn=10987058100
// Return detail jawaban per soal untuk satu siswa di satu subtes

// import { createPool } from "../../../../lib/db";
import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { kategori, nisn } = req.query;

  if (!kategori) {
    return res.status(400).json({ error: "Parameter kategori diperlukan" });
  }

  if (!nisn) {
    return res.status(400).json({ error: "Parameter nisn diperlukan" });
  }

  // Tentukan jenis ujian dari kategori
  const jenis = kategori.startsWith("snbt") ? "snbt" : 
                kategori.startsWith("tka")  ? "tka"  : null;

  if (!jenis) {
    return res.status(400).json({ error: "Kategori tidak valid" });
  }

//   const pool = createPool();
//   const conn = await pool.getConnection();

  try {
    // ═══ 1. Ambil jawaban siswa dari tabel jwb ═══════════════════════════
    const tabelJwb = jenis === "snbt" ? "jwb_snbtcf" : "jwb_tka";
    
    const [jawabanRows] = await pool.execute(
      `SELECT * FROM ${tabelJwb} WHERE kategori = ? AND nisn = ? LIMIT 1`,
      [kategori, nisn]
    );

    if (jawabanRows.length === 0) {
      return res.status(404).json({ error: "Jawaban siswa tidak ditemukan" });
    }

    const jawabanSiswa = jawabanRows[0];

    // ═══ 2. Ambil kunci jawaban & parameter IRT dari tabel soal & irt_params ═
    const tabelSoal = jenis === "snbt" ? "soal_snbt" : "soal_tka";

    const [soalRows] = await pool.execute(
      `SELECT nomor_soal, kunci_jawaban, soal 
       FROM ${tabelSoal} 
       WHERE kategori = ? 
       ORDER BY nomor_soal`,
      [kategori]
    );

    // Ambil parameter IRT (kesulitan b, daya beda a)
    const [paramRows] = await pool.execute(
      `SELECT nomor_soal, a, b, kategori_soal 
       FROM irt_params 
       WHERE kategori = ? 
       ORDER BY nomor_soal`,
      [kategori]
    );

    const paramMap = {};
    paramRows.forEach((row) => {
      paramMap[row.nomor_soal] = {
        a: row.a ? parseFloat(Number(row.a).toFixed(3)) : null,
        b: parseFloat(Number(row.b).toFixed(3)),
        kategori_soal: row.kategori_soal,
      };
    });

    // ═══ 3. Gabungkan data jawaban dengan kunci & parameter ════════════
    const detailSoal = soalRows.map((soal) => {
      const nomor = soal.nomor_soal;
      const jawabanKey = `j_${nomor}`;
      const jawaban = jawabanSiswa[jawabanKey] ?? null;
      const kunci = soal.kunci_jawaban?.trim().toUpperCase() ?? "";
      const jawabanClean = jawaban?.toString().trim().toUpperCase() ?? "";

      // Status: benar / salah / kosong
      let status = "kosong";
      if (jawabanClean) {
        status = jawabanClean === kunci ? "benar" : "salah";
      }

      return {
        nomor_soal: nomor,
        soal_text: soal.soal?.substring(0, 100) || "", // preview 100 char
        jawaban_siswa: jawaban || "—",
        kunci_jawaban: kunci,
        status,
        ...paramMap[nomor],
      };
    });

    // ═══ 4. Hitung statistik ═════════════════════════════════════════════
    const totalSoal = detailSoal.length;
    const totalBenar = detailSoal.filter((s) => s.status === "benar").length;
    const totalSalah = detailSoal.filter((s) => s.status === "salah").length;
    const totalKosong = detailSoal.filter((s) => s.status === "kosong").length;

    // Ambil skor IRT siswa
    const [skorRows] = await pool.execute(
      `SELECT score_1000, F1, kategori_siswa 
       FROM irt_scores 
       WHERE kategori = ? AND nisn = ? 
       LIMIT 1`,
      [kategori, nisn]
    );

    const skorSiswa = skorRows[0] ? {
      score: parseFloat((Number(skorRows[0].score_1000) || 0).toFixed(1)),
      F1: parseFloat((Number(skorRows[0].F1) || 0).toFixed(3)),
      kategori: skorRows[0].kategori_siswa,
    } : null;

    return res.status(200).json({
      kategori,
      nisn,
      nama: jawabanSiswa.nama,
      statistik: {
        total_soal: totalSoal,
        benar: totalBenar,
        salah: totalSalah,
        kosong: totalKosong,
        persentase_benar: totalSoal > 0 ? Math.round((totalBenar / totalSoal) * 100) : 0,
      },
      skor_irt: skorSiswa,
      detail_soal: detailSoal,
    });

  } catch (error) {
    console.error("Error analisis jawaban siswa:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    // pool.release();
    console.log("oke")
  }
}