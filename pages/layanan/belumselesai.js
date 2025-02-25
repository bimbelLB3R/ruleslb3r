import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Pending() {
  const router = useRouter();
  const { order_id } = router.query;

  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (order_id) {
      axios
        .get(`/api/midtrans?order_id=${order_id}`)
        .then((res) => {
          setTransactionData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching transaction details:", err);
          setLoading(false);
        });
    }
  }, [order_id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center border-t-8 border-red-500">
        {/* Gambar status gagal */}
        <div className="flex justify-center">
          <Image
            src="/image/report/gagal.png" // Ganti dengan path gambar Anda
            width={150}
            height={150}
            alt="Payment Failed"
          />
        </div>

        {/* Pesan transaksi gagal */}
        <h2 className="text-lg font-semibold text-gray-800 mt-4">
          Transaksi Belum Selesai
        </h2>
        <p className="text-red-600 text-xs">
  Status: {transactionData ? transactionData.transaction_status : "Memuat..."}
</p>

        <p className="text-gray-600 text-sm">
          Maaf, pembayaran dengan nomor transaksi{" "}
          <span className="font-bold">{order_id}</span> belum dilakukan pembayaran.
        </p>

        {/* Tampilkan detail transaksi jika tersedia */}
        {loading ? (
          <p className="text-gray-500 text-sm mt-2">Mengambil data...</p>
        ) : transactionData ? (
          <div className="text-gray-700 text-sm space-y-2 mt-2">
            <p><span className="font-semibold">Metode Pembayaran:</span> {transactionData.payment_type.replace("_", " ")}</p>
            <p><span className="font-semibold">Jumlah:</span> Rp {parseInt(transactionData.gross_amount).toLocaleString("id-ID")}</p>
          </div>
        ) : (
          <p className="text-red-500 text-sm mt-2">Gagal mengambil data transaksi.</p>
        )}

        <p className="text-red-500 text-sm font-semibold mt-2">
          Silakan coba lagi atau hubungi admin.
        </p>

        {/* Tombol kembali */}
        <div className="mt-4">
          <Link
            href="https://www.bimbellb3r.com"
            className="text-blue-500 hover:text-blue-700 text-sm underline"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
