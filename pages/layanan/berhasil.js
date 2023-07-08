import { useRouter } from "next/router";
export default function Success() {
  const router = useRouter();
  const { order_id } = router.query;
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-4 p-2 text-lg">
        <p>Pembayaran Sukses</p>
        <p>ID Pemesanan = {order_id}</p>
        <p className="text-xs text-red-900">
          (Tunjukkan ID Pemesanan ke Admin sebagai bukti pembayaran)
        </p>
      </div>
    </div>
  );
}
