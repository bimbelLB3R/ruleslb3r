// pages/api/create-transaction.js
import { Midtrans } from 'midtrans-client';

export default async function handler(req, res) {
  //   Inisialisasi klien Midtrans
  const midtransClient = new Midtrans({
    serverKey: 'Mid-server-zzOiNRXtsXKskJUV-kAyWdD1',
    clientKey: 'Mid-client-NnLlPtWqf2pNNl9s',
    isProduction: false, // Ganti dengan true jika sudah di production
  });

  // Membuat objek transaksi
  const transactionDetails = {
    orderId: 'ORDER123',
    grossAmount: 500000,
  };

  const itemDetails = [
    {
      id: 'ITEM01',
      price: 500000,
      quantity: 1,
      name: 'Bola',
    },
  ];

  const customerDetails = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '081234567890',
  };

  //   Mengirim permintaan pembayaran ke Midtrans
  const createTransactionResponse = await midtransClient.createTransaction({
    transactionDetails,
    itemDetails,
    customerDetails,
  });

  //   // create transaction
  //   snap
  //     .createTransaction(transactionDetails, itemDetails, customerDetails)
  //     .then((transaction) => {
  //       // transaction token
  //       let transactionToken = transaction.token;
  //       console.log('transactionToken:', transactionToken);

  //       // transaction redirect url
  //       let transactionRedirectUrl = transaction.redirect_url;
  //       console.log('transactionRedirectUrl:', transactionRedirectUrl);
  //     })
  //     .catch((e) => {
  //       console.log('Error occured:', e.message);
  //     });

  // Mengembalikan token pembayaran ke frontend
  res.status(200).json({ token: createTransactionResponse.token });
  //   res.status(200).json({ token: transactionToken });
}
