// pages/index.js

import { useEffect, useState } from "react";

function PushNotif() {
  const [notificationPermission, setNotificationPermission] =
    useState("default");

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  const handleSubscribe = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;

        if ("PushManager" in window) {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:
              "BF_iaXMcfVjq42wC7dpLb_gfrkzuHsjBuz3THvJ-uHHzbyGacAAYWTdwlhXD-HT6LLtafMTB_y612SgpFxag3qU", // Ganti dengan kunci publik Anda
          });

          // Kirimkan subscription ke server Anda untuk langganan
          console.log("Subscription:", JSON.stringify(subscription));
          localStorage.setItem("subscription", JSON.stringify(subscription));
        }
      } catch (error) {
        console.error("Error subscribing:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="underline">Aktifkan Notifikasi</h1>
      <p>Status Izin: {notificationPermission}</p>
      <button
        onClick={handleSubscribe}
        className="bg-blue-600 hover:bg-blue-400 p-2 rounded-xl"
        // disabled={notificationPermission !== "granted"}
      >
        Aktifkan Sekarang
      </button>
    </div>
  );
}

export default PushNotif;
