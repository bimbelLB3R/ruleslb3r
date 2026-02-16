// pages/api/analisis-siswa.js  (UPDATE — tambah support TKA)
// GET /api/analisis-siswa?nisn=...&jenis=snbt
// GET /api/analisis-siswa?nisn=...&jenis=tka

// import { createPool } from "../../lib/db";
import pool from "../../libs/dbaws";

const LABEL_SUBTES = {
  // SNBT
  pu:  "Penalaran Umum",
  ppu: "Pengetahuan & Pemahaman Umum",
  pbm: "Pemahaman Bacaan & Menulis",
  pk:  "Pengetahuan Kuantitatif",
  lbe: "Literasi Bahasa Inggris",
  lbi: "Literasi Bahasa Indonesia",
  pm:  "Penalaran Matematika",
  // TKA
  matematika:  "Matematika",
  ipa:         "IPA",
  b_indonesia: "Bahasa Indonesia",
  b_inggris:   "Bahasa Inggris",
  ips:         "IPS",
  fisika:      "Fisika",
  kimia:       "Kimia",
  biologi:     "Biologi",
  ekonomi:     "Ekonomi",
  geografi:    "Geografi",
  sejarah:     "Sejarah",
  sosiologi:   "Sosiologi",
};

// Ekstrak subtes key dari slug
// "snbt_pu_01"             → "pu"
// "tka_smp_matematika_01"  → "matematika"
// "tka_sma_b_indonesia_01" → "b_indonesia"
function subtesKey(kategori, jenis) {
  const parts = kategori.split("_");
  if (jenis === "snbt") return parts.slice(1, -1).join("_");
  if (jenis === "tka")  return parts.slice(2, -1).join("_");
  return kategori;
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { nisn, jenis } = req.query;
  if (!nisn)  return res.status(400).json({ error: "nisn diperlukan" });
  if (!jenis) return res.status(400).json({ error: "jenis diperlukan (snbt/tka)" });
  if (!["snbt", "tka"].includes(jenis))
    return res.status(400).json({ error: "jenis harus snbt atau tka" });

//   const pool = createPool();
//   const conn = await pool.getConnection();

  try {
    // 1. Ambil semua skor subtes siswa ini
    const [rows] = await pool.execute(
      `SELECT kategori, F1, score_1000, total_benar, kategori_siswa
       FROM irt_scores
       WHERE nisn = ? AND kategori LIKE ?
       ORDER BY kategori`,
      [nisn, `${jenis}_%`]
    );

    if (rows.length === 0) {
      return res.status(200).json({ ada: false, subtes: [], skorTotal: null });
    }

    // 2. Ambil skor total dari irt_scores_total
    // Tentukan paket dari kategori pertama (ambil bagian terakhir slug)
    const paket = rows[0].kategori.split("_").at(-1);

    const [totalRows] = await pool.execute(
      `SELECT skor_total, ranking, jumlah_subtes
       FROM irt_scores_total
       WHERE nisn = ? AND paket = ?
       LIMIT 1`,
      [nisn, paket]
    );

    // 3. Ambil ranking relatif per subtes
    // "kamu berada di atas X% peserta di subtes ini"
    const subtesData = await Promise.all(rows.map(async (row) => {
      const key   = subtesKey(row.kategori, jenis);
      const label = LABEL_SUBTES[key] ?? key;

      // Hitung persentil: berapa persen siswa punya F1 < siswa ini
      const [[{ lebihRendah }]] = await pool.execute(
        `SELECT COUNT(*) as lebihRendah FROM irt_scores
         WHERE kategori = ? AND F1 < ?`,
        [row.kategori, row.F1]
      );
      const [[{ totalPeserta }]] = await pool.execute(
        `SELECT COUNT(*) as totalPeserta FROM irt_scores WHERE kategori = ?`,
        [row.kategori]
      );

      const persentil = totalPeserta > 0
        ? Math.round((lebihRendah / totalPeserta) * 100)
        : null;

      return {
        kategori:      row.kategori,
        subtesKey:     key,
        label,
        score:         row.score_1000,
        F1:            row.F1,
        totalBenar:    row.total_benar,
        kategoriSiswa: row.kategori_siswa,
        persentil,     // "di atas X% peserta"
        totalPeserta,
      };
    }));

    return res.status(200).json({
      ada:       true,
      jenis,
      paket,
      subtes:    subtesData,
      skorTotal: totalRows[0] ?? null,
    });

  } finally {
    pool.release();
  }
}