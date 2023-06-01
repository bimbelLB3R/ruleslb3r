// pages/api/notification.js
export default function handler(req, res) {
  // Menggunakan req.body untuk mendapatkan data notifikasi dari Midtrans
  const { order_id, transaction_status } = req.body;

  // Mengupdate status pembayaran di sisi server Anda sesuai kebutuhan
  // ...

  // Memberikan respon 200 OK kepada Midtrans
  res.status(200).end();
}
