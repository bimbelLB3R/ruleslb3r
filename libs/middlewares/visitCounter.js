// middleware/visitCounter.js

export default function visitCounter(handler) {
  return (req, res) => {
    // Mengecek apakah cookie kunjungan sudah ada
    let visits = parseInt(req.cookies.visits) || 0;
    visits++;

    // Menetapkan cookie kunjungan yang baru
    res.setHeader("Set-Cookie", `visits=${visits}; HttpOnly; SameSite=Strict`);

    // Melanjutkan ke handler berikutnya dengan menyertakan jumlah kunjungan yang diperbarui
    return handler(req, { ...res, visits });
  };
}
