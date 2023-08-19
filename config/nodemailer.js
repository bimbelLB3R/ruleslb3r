import nodemailer from "nodemailer";

const email = process.env.EMAIL_NODEMAILER;
const pass = process.env.EMAIL_NODEMAILER_PSWWD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});
