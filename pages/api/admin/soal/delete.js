import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, kategori } = req.query;

//   console.log(kategori)
  const validKategori = ['snbt', 'kuantitatif', 'matematika', 'english', 'bacaan', 'penalaran', 'pengetahuan'];
  
  if (!validKategori.includes(kategori) || !id) {
    return res.status(400).json({ error: 'Invalid kategori or id' });
  }

  try {
    await pool.query(
      `DELETE FROM ${kategori} WHERE id = ?`,
      [id]
    );

    return res.status(200).json({ 
      success: true,
      message: 'Soal berhasil dihapus'
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}