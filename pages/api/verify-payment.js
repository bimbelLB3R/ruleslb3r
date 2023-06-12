import axios from 'axios';
//kita tidak perlu membuat token terlebih dahulu. token dipakai ketika kita pakai metode snap, jadi kita langsung kirim req bodynya saja. Jdi metode bayar les langsung metode gopay sedangkan pada layanan pakai metode snap. saya akan hapus koneksi ke create-transaction-bayarles. dan berhasil
export default async function handler(req, res) {
  const newRow = req.body;
  const biayaInt = parseInt(newRow.jumlah);
  const kalipembayaran = newRow.kalipembayaran;
  let totalDibayar;
  let kuantitas;
  if (kalipembayaran && kalipembayaran > 1) {
    totalDibayar = biayaInt * kalipembayaran;
    kuantitas = kalipembayaran;
  } else {
    totalDibayar = biayaInt;
    kuantitas = 1;
  }
  const timestamp = Date.now();
  // requestbody sama dngn di create-transaction-bayar les, ada sedikit modif, berhasil.
  const requestBody = {
    payment_type: 'gopay', //sy tambahkan ini, moga dapat url qris
    transaction_details: {
      order_id: `LB3R_${timestamp}`,
      gross_amount: totalDibayar, //quantity x price
    },
    // dicoba di postmn berhasil dengan menghapus credit card
    // credit_card: {
    //   secure: true,
    // },

    // gopay, berhasil
    enabled_payments: ['gopay'],
    gopay: {
      enable_callback: true,
      callback_url: 'http://gopay.com',
    },

    item_details: [
      {
        id: newRow.idProgram,
        price: newRow.jumlah,
        quantity: kuantitas,
        name: `Pembayaran  ${newRow.bulan}`,
      },
    ],
    customer_details: {
      first_name: newRow.namalengkap,
      last_name: 'LB3R',
      email: 'bimbellb3r@gmail.com',
      phone: newRow.wa,
      // billing_address: {
      //   first_name: newRow.namalengkap,
      //   last_name: 'LB3R',
      //   email: 'bimbellb3r@gmail.com',
      //   phone: newRow.wa,
      //   address: 'Tabalong',
      //   city: 'Tabalong',
      //   postal_code: '71571',
      //   country_code: 'IDN',
      // },
      // shipping_address: {
      //   first_name: newRow.namalengkap,
      //   last_name: 'LB3R',
      //   email: 'bimbellb3r@gmail.com',
      //   phone: newRow.wa,
      //   address: 'Tabalong',
      //   city: 'Tabalong',
      //   postal_code: '71571',
      //   country_code: 'IDN',
      // },
    },
  };

  const snapServerKey = 'SB-Mid-server-EdNalvrIc1PCrcDoVVOnpRV2';
  const transactionInfoUrl = 'https://api.sandbox.midtrans.com/v2/charge';

  // Set request headers
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Basic ${Buffer.from(snapServerKey).toString('base64')}`,
  };

  try {
    const response = await axios.post(transactionInfoUrl, requestBody, {
      headers,
    });
    const transactionQrisUrl = response.data;
    // const qris_url = transactionQrisUrl.actions.find(
    //   (action) => action.name === 'generate-qr-code'
    // ).url;
    // console.log('qrisUrl:', qris_url);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ transactionQrisUrl });
  } catch (error) {
    console.log('Error occurred:', error.message);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to get qris_url' });
  }
}
