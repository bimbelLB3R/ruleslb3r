import pool from "../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nisn } = req.body;

  if (!nisn) {
    return res.status(400).json({ error: 'NISN is required' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT nisn FROM peserta_snbt WHERE nisn = ? LIMIT 1',
      [nisn]
    );

    return res.status(200).json({ exists: rows.length > 0 });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}