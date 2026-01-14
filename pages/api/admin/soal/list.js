import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { kategori, page = 1, limit = 20 } = req.query;

  const validKategori = ['snbt', 'kuantitatif', 'matematika', 'english', 'bacaan', 'penalaran', 'pengetahuan'];
  
  if (!validKategori.includes(kategori)) {
    return res.status(400).json({ error: 'Invalid kategori' });
  }

  try {
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      `SELECT * FROM ${kategori} ORDER BY nomor_soal ASC LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    );

    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM ${kategori}`
    );

    const total = countResult[0].total;

    return res.status(200).json({ 
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}