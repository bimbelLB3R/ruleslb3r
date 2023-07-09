import { useEffect, useState } from "react";

export default function NotificationPage() {
  const [notificationData, setNotificationData] = useState(null);
  console.log(notificationData);
  useEffect(() => {
    fetch("/api/layanan/notification") // Ganti dengan URL endpoint notifikasi yang sesuai
      .then((response) => response.json())
      .then((data) => setNotificationData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>{notificationData ? <div>ada data</div> : <p>Loading...</p>}</div>
  );
}
