import { useState, useEffect } from "react";

export default function StatusPage() {
  const [orderId, setOrderId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    if (!orderId) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/midtrans/status?order_id=${orderId}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Cek Status Transaksi</h1>
      <input
        type="text"
        placeholder="Masukkan Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={fetchStatus}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Cek Status
      </button>

      {loading && <p>Loading...</p>}

      {data && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-semibold">Hasil:</h2>
          <pre className="bg-gray-100 p-2">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
