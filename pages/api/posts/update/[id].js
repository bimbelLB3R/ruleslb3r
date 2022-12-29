import db from '../../../../libs/db';
import authorization from '../../middlewares/authorization';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end();
  // memasukkan middleware authorization
  const auth = await authorization(req, res);
  //mengambil  id dari data yg mau di up date
  const { id } = req.query;
  //mengambil dat title dan content
  const { title, content } = req.body;

  const update = await db('posts').where({ id }).update({
    title,
    content,
  });

  const updatedData = await db('posts').where({ id }).first();
  res.status(200);
  res.json({
    message: 'Update data sukses',
    //tampilkan data
    data: updatedData,
  });
}
