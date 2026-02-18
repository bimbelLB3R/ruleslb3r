// pages/api/admin/siswa/sekolah-list.js
// GET /api/admin/siswa/sekolah-list
// Return list distinct asalsekolah untuk filter dropdown

// import { createPool } from "../../../../lib/db";
import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

//   const pool = createPool();
//   const conn = await pool.getConnection();

  try {
    const [rows] = await pool.execute(
      `SELECT DISTINCT asalsekolah 
       FROM peserta_snbt 
       WHERE asalsekolah != '' 
       ORDER BY asalsekolah ASC`
    );

    const sekolahList = rows.map((r) => r.asalsekolah);

    return res.status(200).json({ data: sekolahList });
  } catch (error) {
    console.error("Error fetching sekolah list:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    // pool.release();
    console.log("oke")
  }
}