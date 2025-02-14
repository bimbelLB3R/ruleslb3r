// pages/api/midtrans.js
import axios from "axios";
const snapServerKey = process.env.SERVER_KEY_MIDTRANS;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { order_id } = req.query;

  if (!order_id) {
    return res.status(400).json({ message: "Missing order_id" });
  }

  try {
    const response = await axios.get(
      `https://api.midtrans.com/v2/${order_id}/status`,
      {
        headers: {
            Authorization: `Basic ${Buffer.from(snapServerKey).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction status", error: error.response?.data || error.message });
  }
}
