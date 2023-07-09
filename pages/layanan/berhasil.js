import { useRouter } from "next/router";
export default function Success() {
  const router = useRouter();
  const { order_id, transaction_status } = router.query;
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-4 p-2 text-lg">
        <p>
          Status Pembayaran <span>{transaction_status}</span>
        </p>
        <p>ID Pemesanan = {order_id}</p>
        <p className="text-xs text-red-900"></p>
      </div>
    </div>
  );
}
