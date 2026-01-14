import pool from '../../../libs/dbaws';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE username = ? LIMIT 1',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = rows[0];
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Jangan kirim password ke client
    delete admin.password;

    return res.status(200).json({ 
      success: true, 
      admin 
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
}