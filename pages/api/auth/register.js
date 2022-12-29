import db from '../../../libs/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  // cek data register dari form
  console.log(res.body);
  //   mempost data melalui insomnia
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  //   console.log(passwordHash);
  // kirim data ke database mysql
  const register = await db('users').insert({
    email,
    password: passwordHash,
  });
  //   mengambil data dari database
  const registeredUser = await db('users').where({ id: register }).first();

  res.status(200);
  res.json({
    message: 'User registered successfully',
    data: registeredUser,
  });
}
