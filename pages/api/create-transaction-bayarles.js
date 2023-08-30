import axios from "axios";

export default async function handler(req, res) {
  const newRow = req.body;
  // console.log(newRow);
  const biayaInt = parseInt(newRow.jumlah);
  const kalipembayaran = newRow.kalipembayaran;
  // console.log(kalipembayaran);
  // const kuantitas = parseInt(newRow.kalipembayaran);
  // console.log(kuantitas);

  let totalDibayar;
  let kuantitas;
  if (kalipembayaran && kalipembayaran > 1) {
    totalDibayar = biayaInt * kalipembayaran;
    kuantitas = kalipembayaran;
  } else {
    totalDibayar = biayaInt;
    kuantitas = 1;
  }
  // console.log(totalDibayar);
  // const first_name = dataFromDaftarLayanan.nama;
  // menyimpan data dataFromDaftarLayanan ke local storage

  // This is just for very basic implementation reference, in production, you should validate the incoming requests and implement your backend more securely.
  // Please refer to this docs for snap popup:
  // https://docs.midtrans.com/en/snap/integration-guide?id=integration-steps-overview

  // Please refer to this docs for snap-redirect:
  // https://docs.midtrans.com/en/snap/integration-guide?id=alternative-way-to-display-snap-payment-page-via-redirect

  const snapApiUrl = "https://app.midtrans.com/snap/v1/transactions";
  const snapServerKey = process.env.SERVER_KEY_MIDTRANS;
  const timestamp = Date.now();

  // Prepare request body
  // satu order_id hanya untuk satu kali request
  const requestBody = {
    payment_type: "qris", //sy tambahkan ini, moga dapat url qris
    transaction_details: {
      order_id: `LB3R_${timestamp}`,
      gross_amount: totalDibayar, //quantity x price
    },
    credit_card: {
      secure: true,
    },
    // menambahkan metode qris gopay
    // qris: {
    //   acquirer: 'gopay',
    // },

    // shopeepay tdk bisa hrs unggah dokumen dl
    // enabled_payments: ['shopeepay'],
    // shopeepay: {
    //   callback_url: `http://shopeepay.com?order_id=LB3R_${timestamp}`,
    // },

    // gopay, berhasil
    enabled_payments: ["gopay"],
    gopay: {
      // callback_url: "http://gopay.com",
      enable_callback: true,
      callback_url: "http://bimbellb3r.com",
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
      last_name: "(Siswa LB3R)",
      email: "webbimbellb3r@gmail.com",
      phone: newRow.wa,
      billing_address: {
        first_name: newRow.namalengkap,
        last_name: "LB3R",
        email: "webbimbellb3r@gmail.com",
        phone: newRow.wa,
        address: "Tabalong",
        city: "Tabalong",
        postal_code: "71571",
        country_code: "IDN",
      },
      shipping_address: {
        first_name: newRow.namalengkap,
        last_name: "(Siswa LB3R)",
        email: "webbimbellb3r@gmail.com",
        phone: newRow.wa,
        address: "Tabalong",
        city: "Tabalong",
        postal_code: "71571",
        country_code: "IDN",
      },
    },
  };

  // Set request headers
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Basic ${Buffer.from(snapServerKey).toString("base64")}`,
  };

  try {
    const response = await axios.post(snapApiUrl, requestBody, { headers });
    const transactionToken = response.data.token;
    console.log("transactionToken:", transactionToken);

    // transaction redirect url
    const transactionRedirectUrl = response.data.redirect_url;
    console.log("transactionRedirectUrl:", transactionRedirectUrl);

    // const qrisUrl = response.data.qris_url;
    // console.log('qrisUrl:', qrisUrl);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ transactionToken, transactionRedirectUrl });
  } catch (error) {
    console.log("Error occurred:", error.message);
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Failed to create transaction" });
  }
}
