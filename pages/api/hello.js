// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200); //200 artinya oke
  res.json({ name: 'John Doe' });
}

//kita akan menggunakan library knexjs.org
