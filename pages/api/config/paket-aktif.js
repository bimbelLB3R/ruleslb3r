// /api/config/paket-aktif.js
// GET /api/config/paket-aktif?jenis=snbt
// GET /api/config/paket-aktif?jenis=tka&jenjang=smp
//
// Digunakan oleh halaman login siswa untuk mendapatkan paket aktif
// tanpa perlu autentikasi admin.

import pool from "../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { jenis, jenjang } = req.query;

  // Tentukan config_key dari parameter
  let configKey;
  if (jenis === "snbt") {
    configKey = "paket_snbt";
  } else if (jenis === "tka" && jenjang) {
    const validJenjang = ["sd", "smp", "sma"];
    if (!validJenjang.includes(jenjang)) {
      return res.status(400).json({ error: "Jenjang tidak valid" });
    }
    configKey = `paket_tka_${jenjang}`;
  } else {
    return res.status(400).json({ error: "Parameter jenis (snbt/tka) dan jenjang (untuk TKA) diperlukan" });
  }

  try {
    const [[row]] = await pool.query(
      `SELECT config_val FROM app_config WHERE config_key = ?`,
      [configKey]
    );

    const paket = row?.config_val ?? "01";

    // Cache 30 detik di browser — cukup fresh tanpa overload DB
    res.setHeader("Cache-Control", "public, max-age=30");
    return res.status(200).json({ paket });

  } catch (error) {
    console.error("paket-aktif error:", error);
    // Fallback ke paket 01 jika DB error — siswa tetap bisa login
    return res.status(200).json({ paket: "01", fallback: true });
  }
}