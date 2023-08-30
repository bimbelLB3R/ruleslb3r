// pages/index.js

import { useEffect, useState } from "react";
import "animate.css";

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
            applicationServerKey: process.env.WEBPUSH_PUBLIC_KEY, // Ganti dengan kunci publik Anda
          });

          // Kirimkan subscription ke server Anda untuk langganan
          // console.log("Subscription:", JSON.stringify(subscription));
          localStorage.setItem("subscription", JSON.stringify(subscription));
          alert("your status is verified, you can continue fill the form");
        }
      } catch (error) {
        console.error("Error subscribing:", error);
      }
    }
  };

  return (
    <div className="animate__animated animate__bounceIn animate__delay-1s">
      {notificationPermission === "granted" ? (
        <div>
          Congratulation! Your status is{" "}
          <span className="font-bold text-green-600 uppercase">granted</span>.
          klik{" "}
          <button onClick={handleSubscribe} className="underline">
            here to verify
          </button>{" "}
          before continue fill the form
        </div>
      ) : (
        <div>
          Your status is{" "}
          <span className="font-bold text-red-600 uppercase">
            {notificationPermission}
          </span>{" "}
          , make sure to change it become granted by{" "}
          <button onClick={handleSubscribe} className="underline">
            clik here
          </button>{" "}
          or set up your browser.
        </div>
      )}
    </div>
  );
}

export default PushNotif;
