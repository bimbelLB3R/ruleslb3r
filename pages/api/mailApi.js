import { transporter } from "../../config/nodemailer";
//referensi nodemailer  https://www.youtube.com/watch?v=t2LvPXHLrek

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const emailHTML = `
    <p>Terima kasih telah mendaftar di Bimbel LB3R.</p>
    <p>Silakan klik tautan di bawah ini untuk melanjutkan proses pembayaran:</p>
    <a href="${data.redirectUrl}">${data.redirectUrl}</a>
    <p>Jika Anda mengalami masalah, silakan hubungi dukungan pelanggan kami.</p>    
  `;
    if (!data) {
      return res.status(400).send({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_NODEMAILER,
        to: data.email,
        subject: "Pembayaran Bimbel LB3R",
        html: emailHTML,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Gagal mengirim email" });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default handler;
