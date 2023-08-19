import axios from "axios";

export default async function handler(req, res) {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "bimbellb3r@gmail",
      pass: "sulingan",
    },
    secure: true,
  });
  const mailData = {
    from: "bimbellb3r@gmail",
    to: "ayoberkarya@gmail.com",
    subject: `Message From Wahyudi`,
    text: "halo",
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(200);

  const newRow = req.body;
  console.log(newRow);
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

  try {
    const response = await axios.post(snapApiUrl, requestBody, { headers });
    const transactionToken = response.data.token;
    console.log("transactionToken:", transactionToken);

    // transaction redirect url
    const transactionRedirectUrl = response.data.redirect_url;
    console.log("transactionRedirectUrl:", transactionRedirectUrl);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ transactionToken, transactionRedirectUrl });
  } catch (error) {
    console.log("Error occurred:", error.message);
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ error: "Failed to create transaction" });
  }
}
