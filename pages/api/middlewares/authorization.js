import jwt from 'jsonwebtoken';

export default function authorization(req, res) {
  //   supaya bisa dipakai ditempat lain, maka dibuat promisenyg sifatnya asyncronous shg perlu await
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).end();

    // memecah authorisasi berdasar spasi
    const authSplit = authorization.split(' ');
    // console.log(authSplit);

    // destructur array
    const [authType, authToken] = [authSplit[0], authSplit[1]];

    if (authType !== 'Bearer') return res.status(401).end();
    return jwt.verify(authToken, 'iniscreetkey', function (err, decoded) {
      if (err) return res.status(401).end(); //jika error
      return resolve(decoded); //jika berhasil
    });
  });
}
