// pages/api/admin/siswa/index.js
// CRUD peserta_snbt dengan pagination, filter, search
// GET    /api/admin/siswa?page=1&limit=20&search=john&sekolah=SMA+1
// POST   /api/admin/siswa (create)
// PUT    /api/admin/siswa (update by id)
// DELETE /api/admin/siswa?id=123

// import { createPool } from "../../../../lib/db";
import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
//   const pool = createPool();
//   const conn = await pool.getConnection();

  try {
    // ═══ GET: List dengan pagination & filter ════════════════════════════
    if (req.method === "GET") {
      const {
        page = 1,
        limit = 20,
        search = "",
        sekolah = "",
        sortBy = "created_at",
        sortOrder = "DESC",
      } = req.query;

      const offset = (parseInt(page) - 1) * parseInt(limit);

      // Build WHERE clause
      const conditions = [];
      const params = [];

      if (search) {
        conditions.push("(nama LIKE ? OR nisn LIKE ? OR email LIKE ? OR wa LIKE ?)");
        const searchPattern = `%${search}%`;
        params.push(searchPattern, searchPattern, searchPattern, searchPattern);
      }

      if (sekolah) {
        conditions.push("asalsekolah LIKE ?");
        params.push(`%${sekolah}%`);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

      // Count total
      const [countResult] = await pool.query(
        `SELECT COUNT(*) as total FROM peserta_snbt ${whereClause}`,
        params
      );
      const total = countResult[0].total;

      // Fetch data
      const allowedSortFields = ["nama", "nisn", "asalsekolah", "created_at"];
      const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "created_at";
      const safeSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const [rows] = await pool.query(
        `SELECT id, nama, nisn, asalsekolah, wa, email, prodi1, kampus1, prodi2, kampus2, foto, created_at, updated_at
         FROM peserta_snbt
         ${whereClause}
         ORDER BY ${safeSortBy} ${safeSortOrder}
         LIMIT ? OFFSET ?`,
        [...params, parseInt(limit), offset]
      );

      return res.status(200).json({
        data: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      });
    }

    // ═══ POST: Create ═════════════════════════════════════════════════════
    if (req.method === "POST") {
      const { nama, nisn, asalsekolah, wa, prodi1, kampus1, prodi2, kampus2, email, foto } = req.body;

      // Validasi required
      if (!nama || !nisn || !asalsekolah || !wa || !email) {
        return res.status(400).json({ error: "Field wajib: nama, nisn, asalsekolah, wa, email" });
      }

      // Cek NISN duplikat
      const [existing] = await pool.query("SELECT id FROM peserta_snbt WHERE nisn = ?", [nisn]);
      if (existing.length > 0) {
        return res.status(409).json({ error: "NISN sudah terdaftar" });
      }

      const [result] = await pool.query(
        `INSERT INTO peserta_snbt (nama, nisn, asalsekolah, wa, prodi1, kampus1, prodi2, kampus2, email, foto)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nama, nisn, asalsekolah, wa, prodi1 || "", kampus1 || "", prodi2 || "", kampus2 || "", email, foto || null]
      );

      return res.status(201).json({ message: "Siswa berhasil ditambahkan", id: result.insertId });
    }

    // ═══ PUT: Update ══════════════════════════════════════════════════════
    if (req.method === "PUT") {
      const { id, nama, nisn, asalsekolah, wa, prodi1, kampus1, prodi2, kampus2, email, foto } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID diperlukan untuk update" });
      }

      // Cek NISN duplikat (kecuali milik sendiri)
      if (nisn) {
        const [existing] = await pool.query(
          "SELECT id FROM peserta_snbt WHERE nisn = ? AND id != ?",
          [nisn, id]
        );
        if (existing.length > 0) {
          return res.status(409).json({ error: "NISN sudah digunakan siswa lain" });
        }
      }

      // Build dynamic update
      const fields = [];
      const values = [];

      if (nama !== undefined) { fields.push("nama = ?"); values.push(nama); }
      if (nisn !== undefined) { fields.push("nisn = ?"); values.push(nisn); }
      if (asalsekolah !== undefined) { fields.push("asalsekolah = ?"); values.push(asalsekolah); }
      if (wa !== undefined) { fields.push("wa = ?"); values.push(wa); }
      if (prodi1 !== undefined) { fields.push("prodi1 = ?"); values.push(prodi1); }
      if (kampus1 !== undefined) { fields.push("kampus1 = ?"); values.push(kampus1); }
      if (prodi2 !== undefined) { fields.push("prodi2 = ?"); values.push(prodi2); }
      if (kampus2 !== undefined) { fields.push("kampus2 = ?"); values.push(kampus2); }
      if (email !== undefined) { fields.push("email = ?"); values.push(email); }
      if (foto !== undefined) { fields.push("foto = ?"); values.push(foto); }

      if (fields.length === 0) {
        return res.status(400).json({ error: "Tidak ada field yang diupdate" });
      }

      values.push(id);
      await pool.query(
        `UPDATE peserta_snbt SET ${fields.join(", ")} WHERE id = ?`,
        values
      );

      return res.status(200).json({ message: "Data siswa berhasil diupdate" });
    }

    // ═══ DELETE ═══════════════════════════════════════════════════════════
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID diperlukan untuk delete" });
      }

      await pool.query("DELETE FROM peserta_snbt WHERE id = ?", [id]);

      return res.status(200).json({ message: "Siswa berhasil dihapus" });
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (error) {
    console.error("API siswa error:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    // pool.release();
    console.log("Oke")
  }
}