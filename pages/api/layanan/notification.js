export default function handler(req, res) {
  const data = req.body; // Mendapatkan data yang dikirimkan oleh Midtrans
  // Lakukan pemrosesan data sesuai kebutuhan Anda
  // Misalnya, Anda dapat mengakses nilai-nilai dengan data.transaction_type, data.transaction_time, dsb.
  // console.log(data);

  // Mengirimkan respons dengan status HTTP 200
  if (data) {
    res.status(200).json({ data: data });
  } else {
    res.status("Tidak ada data");
  }
}
