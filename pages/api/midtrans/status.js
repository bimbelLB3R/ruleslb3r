export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { order_id } = req.query;
    if (!order_id) {
      return res.status(400).json({ error: "order_id is required" });
    }
  
    try {
      const serverKey = process.env.SERVER_KEY_MIDTRANS; // Ganti dengan server key Midtrans
      const encodedKey = Buffer.from(`${serverKey}:`).toString("base64");
  
      const response = await fetch(
        `https://api.midtrans.com/v2/${order_id}/status`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${encodedKey}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch transaction status");
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  