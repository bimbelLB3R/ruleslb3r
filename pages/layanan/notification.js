import { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationPage() {
  const [notificationData, setNotificationData] = useState(null);
  console.log(notificationData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/layanan/notification"); // Ganti dengan URL endpoint notifikasi yang sesuai
        setNotificationData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {notificationData ? (
        <div>
          <h1>Notification Details</h1>
          <p>Transaction Type: {notificationData.transaction_type}</p>
          <p>Transaction Time: {notificationData.transaction_time}</p>
          <p>Transaction Status: {notificationData.transaction_status}</p>
          {/* Tambahkan lebih banyak pemetaan sesuai dengan kebutuhan Anda */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
