import db from '../../../libs/db';
import authorization from '../middlewares/authorization';

// cara manual
// export default async function (req, res) {
//   const create = await db('posts').insert({
//     title: 'Judul post 1',
//     content: 'Isi konten 1',
//   });
//   res.status(200);
//   res.json({
//     message: 'Post berhasil dikirim',
//   });
// }

// Cara dinamis req body (sesuai isian user)
export default async function (req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  // memasukkan middleware authorization
  const auth = await authorization(req, res);

  const { title, content } = req.body;
  const create = await db('posts').insert({
    title,
    content,
  });
  //menampilkan data
  const createData = await db('posts').where('id', create).first(); //first supaya data berbentuk objek bukan array dlm object
  res.status(200);
  res.json({
    message: 'Post berhasil dikirim',
    //tampilkan data
    data: createData,
  });
}
