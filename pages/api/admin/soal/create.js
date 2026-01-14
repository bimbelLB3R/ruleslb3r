import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { kategori, ...soalData } = req.body;
//   console.log(soalData)

  const validKategori = ['snbt', 'kuantitatif', 'matematika', 'english', 'bacaan', 'penalaran', 'pengetahuan'];
  
  if (!validKategori.includes(kategori)) {
    return res.status(400).json({ error: 'Invalid kategori' });
  }

  try {
    const fields = Object.keys(soalData).join(', ');
    const placeholders = Object.keys(soalData).map(() => '?').join(', ');
    const values = Object.values(soalData);

    const [result] = await pool.query(
      `INSERT INTO ${kategori} (${fields}) VALUES (${placeholders})`,
      values
    );

    return res.status(201).json({ 
      success: true, 
      id: result.insertId,
      message: 'Soal berhasil ditambahkan'
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}