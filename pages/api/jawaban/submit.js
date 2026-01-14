import pool from "../../../libs/dbaws"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { kategori, ...jawaban } = req.body;

  // Validasi kategori
  const lembarJawab = {
    snbt: 'jwb_snbt',
    kuantitatif: 'jwb_kuantitatif',
    matematika: 'jwb_matematika',
    english: 'jwb_english',
    bacaan: 'jwb_bacaan',
    penalaran: 'jwb_penalaran',
    pengetahuan: 'jwb_pengetahuan',
  };

  if (!kategori || !lembarJawab[kategori]) {
    return res.status(400).json({ error: 'Invalid kategori' });
  }

  const tableName = lembarJawab[kategori];
  const { nisn } = jawaban;

  if (!nisn) {
    return res.status(400).json({ error: 'NISN is required' });
  }

  try {
    // Cek apakah siswa sudah mengerjakan
    const [existing] = await pool.query(
      `SELECT nisn FROM ${tableName} WHERE nisn = ? LIMIT 1`,
      [nisn]
    );

    if (existing.length > 0) {
      // Update jawaban
      const fields = Object.keys(jawaban)
        .filter(key => key !== 'nisn')
        .map(key => `${key} = ?`)
        .join(', ');
      
      const values = Object.keys(jawaban)
        .filter(key => key !== 'nisn')
        .map(key => jawaban[key]);
      
      values.push(nisn);

      await pool.query(
        `UPDATE ${tableName} SET ${fields} WHERE nisn = ?`,
        values
      );

      return res.status(200).json({ 
        success: true, 
        message: 'Jawaban diperbarui',
        action: 'update'
      });
    } else {
      // Insert jawaban baru
      const fields = Object.keys(jawaban).join(', ');
      const placeholders = Object.keys(jawaban).map(() => '?').join(', ');
      const values = Object.values(jawaban);

      await pool.query(
        `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`,
        values
      );

      return res.status(201).json({ 
        success: true, 
        message: 'Jawaban dikirim',
        action: 'insert'
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}