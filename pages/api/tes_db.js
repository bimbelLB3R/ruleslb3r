import pool from "../../libs/dbaws";
export default async function handler(req, res) {
  try {
    const [rows] = await pool.query("SHOW TABLES");
    res.status(200).json({ success: true, tables: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
