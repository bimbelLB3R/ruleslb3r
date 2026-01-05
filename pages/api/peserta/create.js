import pool from "../../../libs/dbaws";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nama, nisn, asalsekolah, wa, prodi1, kampus1, prodi2, kampus2, email, foto } = req.body;

  // Validasi data
  if (!nama || !nisn || !asalsekolah || !wa || !prodi1 || !kampus1 || !prodi2 || !kampus2 || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO peserta_snbt 
       (nama, nisn, asalsekolah, wa, prodi1, kampus1, prodi2, kampus2, email, foto) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nama, nisn, asalsekolah, wa, prodi1, kampus1, prodi2, kampus2, email, foto]
    );

    return res.status(201).json({ 
      success: true, 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Database error:', error);
    
    // Cek jika error duplicate entry
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'NISN atau email sudah terdaftar' });
    }
    
    return res.status(500).json({ error: 'Database error' });
  }
}