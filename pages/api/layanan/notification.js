export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body; // Mendapatkan data yang dikirimkan oleh Midtrans
    // Lakukan pemrosesan data sesuai kebutuhan Anda
    // Misalnya, Anda dapat mengakses nilai-nilai dengan data.transaction_type, data.transaction_time, dsb.
    console.log(data);

    // Mengirimkan respons dengan status HTTP 200
    res.status(200).end();
  } else {
    res.status(405).end(); // Mengirimkan respons dengan status HTTP 405 jika metode selain POST diakses
  }
}
