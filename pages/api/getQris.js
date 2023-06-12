import axios from 'axios';
//kita tidak perlu membuat token terlebih dahulu. token dipakai ketika kita pakai metode snap, jadi kita langsung kirim req bodynya saja. Jdi metode bayar les langsung metode gopay sedangkan pada layanan pakai metode snap. saya akan hapus koneksi ke create-transaction-bayarles. dan berhasil
export default async function handler(req, res) {
  const qrisUrl = req.body;
  console.log(qrisUrl);

  const requestBody = {
    payment_type: 'gopay', //sy tambahkan ini, moga dapat url qris
    transaction_details: {
      order_id: `LB3R_123`,
      gross_amount: 10000, //quantity x price
    },
    enabled_payments: ['gopay'],
    gopay: {
      enable_callback: true,
      callback_url: 'http://gopay.com',
    },

    item_details: [
      {
        id: "tesabc",
        price: 10000,
        quantity: 1,
        name: `Pembayaran Agustus`,
      },
    ],
    customer_details: {
      first_name: "Wahyudi",
      last_name: 'LB3R',
      email: 'bimbellb3r@gmail.com',
      phone: "081392552459",
    },
  };

  const snapServerKey = 'SB-Mid-server-EdNalvrIc1PCrcDoVVOnpRV2';
  const transactionInfoUrl = qrisUrl;

  // Set request headers
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'image/png, image/jpeg,application/json',
    Authorization: `Basic ${Buffer.from(snapServerKey).toString('base64')}`,
  };

  try {
    const response = await axios.post(transactionInfoUrl, requestBody, {
      headers,
    });
    const qris = response.data;
    // const qris_url = transactionQrisUrl.actions.find(
    //   (action) => action.name === 'generate-qr-code'
    // ).url;
    // console.log('qrisUrl:', qris_url);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ qris });
  } catch (error) {
    console.log('Error occurred:', error.message);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to get qris_url' });
  }
}
