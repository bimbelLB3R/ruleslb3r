// middleware/customHeaders.js

export default function customHeaders(handler) {
  return (req, res) => {
    // Menyesuaikan header HTTP
    const customHeaders = {
      "Set-Cookie": "HttpOnly; SameSite=Strict", // Menetapkan atribut HttpOnly dan SameSite=Strict untuk semua cookie
    };

    // Melanjutkan ke handler berikutnya dengan menyatukan header yang disesuaikan
    return handler(req, { ...res, headers: customHeaders });
  };
}
