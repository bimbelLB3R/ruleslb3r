import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Layout from "../../components/Layout";

export default function Success() {
  const router = useRouter();
  const { order_id } = router.query;

  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          setError("Gagal mengambil data transaksi.");
          setLoading(false);
        });
    }
  }, [order_id]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        {loading ? (
          <p>Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : transactionData ? (
          <div className="bg-[url('/image/card.png')] bg-cover bg-center shadow-lg rounded-lg max-w-md w-full p-6 border-t-8 border-orange-400">
            {/* Header */}
            <div className="flex justify-center space-x-4">
              <div className="flex items-center justify-center">
                <Image
                  src="/image/iconlb3r.png"
                  width={52}
                  height={52}
                  alt="logo"
                  priority={true}
                  className="rounded-full"
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Transfer BIMBEL LB3R
                </h2>
                <p
                  className={`font-bold ${
                    transactionData.transaction_status === "settlement"
                      ? "text-green-600"
                      : transactionData.transaction_status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {transactionData.transaction_status}
                </p>
              </div>
            </div>

            <hr className="my-3 border-gray-300" />

            {/* Detail Transaksi */}
            <div className="text-gray-700 text-sm space-y-2">
              <p>
                <span className="font-semibold">Nomor ID Transaksi:</span>{" "}
                {order_id}
              </p>
              <p>
                <span className="font-semibold">Tanggal Transaksi:</span>{" "}
                {transactionData.transaction_time}
              </p>
              <p>
                <span className="font-semibold">Metode Pembayaran:</span>{" "}
                {transactionData.payment_type.replace("_", " ")}
              </p>
              <p>
                <span className="font-semibold">Jumlah:</span> Rp{" "}
                {parseInt(transactionData.gross_amount).toLocaleString("id-ID")}
              </p>
            </div>

            <hr className="my-3 border-gray-300" />

            {/* Pesan Terima Kasih */}
            {transactionData.transaction_status === "settlement"&&
            <div className="text-center text-xs text-gray-600">
              <p>Terima kasih telah melakukan pembayaran tepat waktu.</p>
              <p>Semoga transaksi ini membawa berkah untuk Anda.</p>
              <p className="text-red-600">
                Screenshoot dan kirim bukti ke admin ya...
              </p>
            </div>
            }
          </div>
        ) : (
          <p className="text-red-500">Transaksi tidak ditemukan.</p>
        )}
      </div>
    </Layout>
  );
}
