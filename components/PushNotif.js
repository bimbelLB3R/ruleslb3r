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
          // console.log("Subscription:", JSON.stringify(subscription));
          localStorage.setItem("subscription", JSON.stringify(subscription));
          alert("it saved successfully, you can continue fill the form");
        }
      } catch (error) {
        console.error("Error subscribing:", error);
      }
    }
  };

  return (
    <div>
      {notificationPermission === "granted" ? (
        <div>
          Congratulation! Your status is granted. klik{" "}
          <button onClick={handleSubscribe} className="underline">
            here to save it
          </button>{" "}
          before continue fill the form
        </div>
      ) : (
        <div>
          Your status is {notificationPermission}, make sure to change it become
          granted by{" "}
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
