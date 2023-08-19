import axios from "axios";
import { transporter } from "../../config/nodemailer";

export default async function handler(req, res) {
  const newRow = req.body;
  // console.log(newRow);
  const biayaInt = parseInt(newRow.biaya);
  // const first_name = dataFromDaftarLayanan.nama;
  // menyimpan data dataFromDaftarLayanan ke local storage

  // This is just for very basic implementation reference, in production, you should validate the incoming requests and implement your backend more securely.
  // Please refer to this docs for snap popup:
  // https://docs.midtrans.com/en/snap/integration-guide?id=integration-steps-overview

  // Please refer to this docs for snap-redirect:
  // https://docs.midtrans.com/en/snap/integration-guide?id=alternative-way-to-display-snap-payment-page-via-redirect

  const snapApiUrl = "https://app.midtrans.com/snap/v1/transactions";
  const snapServerKey = "Mid-server-zzOiNRXtsXKskJUV-kAyWdD1";
  const timestamp = Date.now();

  // Prepare request body
  // satu order_id hanya untuk satu kali request
  const requestBody = {
    transaction_details: {
      order_id: `LB3R_${timestamp}`,
      gross_amount: biayaInt,
    },
    credit_card: {
      secure: true,
    },
    item_details: [
      {
        id: newRow.idProgram,
        price: biayaInt,
        quantity: 1,
        name: newRow.program,
      },
    ],
    customer_details: {
      first_name: newRow.nama,
      email: newRow.email,
      phone: newRow.wa,
      billing_address: {
        first_name: newRow.nama,
        last_name: "LB3R",
        email: newRow.email,
        phone: newRow.wa,
        address: newRow.asalsekolah,
        city: "Tabalong",
        postal_code: "71571",
        country_code: "IDN",
      },
      shipping_address: {
        first_name: newRow.nama,
        last_name: "LB3R",
        email: newRow.email,
        phone: newRow.wa,
        address: newRow.asalsekolah,
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
  const headers2 = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    //referensi nodemailer  https://www.youtube.com/watch?v=t2LvPXHLrek
    await transporter.sendMail({
      from: process.env.EMAIL_NODEMAILER,
      to: newRow.email,
      subject: "Pembayaran Bimbel LB3R",
      text: "Hai",
    });
    const responseMail = await axios.post({ headers2 });
    const response2 = responseMail.data;

    const response = await axios.post(snapApiUrl, requestBody, { headers });
    const transactionToken = response.data.token;
    // console.log("transactionToken:", transactionToken);

    // transaction redirect url
    const transactionRedirectUrl = response.data.redirect_url;
    // console.log("transactionRedirectUrl:", transactionRedirectUrl);

    res.setHeader("Content-Type", "application/json");
    res
      .status(200)
      .json({ transactionToken, transactionRedirectUrl, response2 });
  } catch (error) {
    console.log("Error occurred:", error.message);
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Failed to create transaction" });
  }
}
