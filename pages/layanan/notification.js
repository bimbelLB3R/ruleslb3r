import { useEffect, useState } from "react";

export default function NotificationPage() {
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    fetch("/api/layanan/notification") // Ganti dengan URL endpoint notifikasi yang sesuai
      .then((response) => response.json())
      .then((data) => setNotificationData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {notificationData ? (
        <pre>{JSON.stringify(notificationData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
