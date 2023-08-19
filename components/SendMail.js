// import nodemailer from "nodemailer";

export default async function sendMail(email, link) {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "bimbellb3r@gmail.com",
      pass: "sulingan",
    },
    secure: true,
  });

  try {
    await transporter.sendMail({
      from: "bimbellb3r@gmail.com",
      to: email, // Alamat email pengguna
      subject: "Link Pembayaran Bimbel LB3R",
      text: `Here is your link: ${link}`,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}
