// /api/admin/config.js
// GET  → ambil semua konfigurasi paket aktif
// PUT  → update satu config_key

import pool from "../../../libs/dbaws";

// Key yang boleh diupdate (whitelist)
const VALID_KEYS = ["paket_snbt", "paket_tka_sd", "paket_tka_smp", "paket_tka_sma"];

function normalizePaket(raw) {
  const num = parseInt(raw, 10);
  if (isNaN(num) || num < 1 || num > 99) return null;
  return String(num).padStart(2, "0");
}

export default async function handler(req, res) {

  // ── GET: ambil semua config ──────────────────────────────────
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query(
        `SELECT config_key, config_val, label, updated_at, updated_by
         FROM app_config
         WHERE config_key IN (?)`,
        [VALID_KEYS]
      );

      // Ubah array → object: { paket_snbt: "01", paket_tka_sd: "02", ... }
      const config = {};
      rows.forEach((r) => {
        config[r.config_key] = {
          value:      r.config_val,
          label:      r.label,
          updatedAt:  r.updated_at,
          updatedBy:  r.updated_by,
        };
      });

      return res.status(200).json({ success: true, config });
    } catch (error) {
      console.error("Config GET error:", error);
      return res.status(500).json({ error: "Database error" });
    }
  }

  // ── PUT: update satu config ──────────────────────────────────
  if (req.method === "PUT") {
    const { config_key, config_val, updated_by } = req.body;

    if (!VALID_KEYS.includes(config_key)) {
      return res.status(400).json({ error: "Invalid config_key" });
    }

    const paket = normalizePaket(config_val);
    if (!paket) {
      return res.status(400).json({ error: "Nilai paket tidak valid (01–99)" });
    }

    try {
      await pool.query(
        `UPDATE app_config
         SET config_val = ?, updated_by = ?
         WHERE config_key = ?`,
        [paket, updated_by ?? "admin", config_key]
      );

      return res.status(200).json({
        success: true,
        message: `Paket aktif ${config_key} diubah ke ${paket}`,
        config_key,
        config_val: paket,
      });
    } catch (error) {
      console.error("Config PUT error:", error);
      return res.status(500).json({ error: "Database error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}