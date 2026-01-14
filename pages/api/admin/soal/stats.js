import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { kategori } = req.query;

  const validKategori = ['snbt', 'kuantitatif', 'matematika', 'english', 'bacaan', 'penalaran', 'pengetahuan'];
  
  if (!validKategori.includes(kategori)) {
    return res.status(400).json({ error: 'Invalid kategori' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) as total FROM ${kategori}`
    );

    return res.status(200).json({ 
      total: rows[0].total,
      kategori
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}