// pages/api/verify-payment.js
import { Midtrans } from 'midtrans-client';

export default async function handler(req, res) {
  // Inisialisasi klien Midtrans
  const midtransClient = new Midtrans({
    serverKey: 'Mid-server-zzOiNRXtsXKskJUV-kAyWdD1',
    clientKey: 'Mid-client-NnLlPtWqf2pNNl9s',
    isProduction: false, // Ganti dengan true jika sudah di production
  });

  // Mendapatkan informasi status pembayaran dari Midtrans
  const transactionId = req.body.transaction_id;

  try {
    const statusResponse = await midtransClient.transaction.status(
      transactionId
    );
    const { transaction_status, fraud_status } = statusResponse;

    // Mengupdate status pembayaran di sisi server Anda sesuai kebutuhan
    // ...

    // Memberikan respon sukses ke Midtrans
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error('Failed to verify payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}
