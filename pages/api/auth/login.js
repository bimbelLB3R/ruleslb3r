import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // validasi
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  // cek apakah email user ada
  const checkUser = await db('users').where({ email }).first();
  if (!checkUser) return res.status(401).end();

  // membandingkan password
  const checkPassword = await bcrypt.compare(password, checkUser.password);
  console.log(checkPassword); //bernilai true jika password plaintext dan hash sama
  if (!checkPassword) return res.status(401).end();

  //   membuat token
  const token = jwt.sign(
    {
      id: checkUser.id,
      email: checkUser.email,
    },
    'iniscreetkey', //ditaruh di .env
    {
      expiresIn: '7d', //7 hari token kadaluarsa
    }
  );

  res.status(200);
  res.json({
    message: 'login successfully',
    token,
  });
}
