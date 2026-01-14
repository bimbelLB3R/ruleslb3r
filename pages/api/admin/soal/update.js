import pool from "../../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, kategori, ...soalData } = req.body;

  const validKategori = ['snbt', 'kuantitatif', 'matematika', 'english', 'bacaan', 'penalaran', 'pengetahuan'];
  
  if (!validKategori.includes(kategori) || !id) {
    return res.status(400).json({ error: 'Invalid kategori or id' });
  }

  try {
    const fields = Object.keys(soalData)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = [...Object.values(soalData), id];
    console.log("FIELDS:", fields);
console.log("VALUES:", values);
    await pool.query(
      `UPDATE ${kategori} SET ${fields} WHERE id = ?`,
      values
    );

    return res.status(200).json({ 
      success: true,
      message: 'Soal berhasil diupdate'
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}