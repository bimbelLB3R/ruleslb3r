import { useEffect, useState } from "react";
import webpush from "web-push";

export default function kirimpesan() {
  const subscription = {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/erzUDBCq8Nk:APA91bGj1Rqq_iDAfj8_AlK8mtB1XPp00EMUdI5wswYfiyhIOg4CZu75nM9EofYADsMNxdeN6IckpiEhdubvL-O6Jh7rBsnKe6IMw1_36CwjxmoE1fPRCtFcvTZPFfsPh9lZbmgLxy3y",
    expirationTime: null,
    keys: {
      p256dh:
        "BDUkRPwduISfGtPjKJhIkHqQRrojGvQXda2VMBR8iKPImHfQedQV78eroSy3jrGBn3apI5M0Q0x3y86NZaoB5aQ",
      auth: "hnMdvjrRgSu9Nw_wggLrZQ",
    },
  };

  const pushSubscription = {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/erzUDBCq8Nk:APA91bGj1Rqq_iDAfj8_AlK8mtB1XPp00EMUdI5wswYfiyhIOg4CZu75nM9EofYADsMNxdeN6IckpiEhdubvL-O6Jh7rBsnKe6IMw1_36CwjxmoE1fPRCtFcvTZPFfsPh9lZbmgLxy3y",
    keys: {
      p256dh:
        "BDUkRPwduISfGtPjKJhIkHqQRrojGvQXda2VMBR8iKPImHfQedQV78eroSy3jrGBn3apI5M0Q0x3y86NZaoB5aQ",
      auth: "hnMdvjrRgSu9Nw_wggLrZQ",
    },
  };

  const payload = "Jatuh tempo per tanggal 15";

  const options = {
    // ... other options ...
    vapidDetails: {
      subject: "mailto:seftinadwi@gmail.com",
      publicKey:
        "BF_iaXMcfVjq42wC7dpLb_gfrkzuHsjBuz3THvJ-uHHzbyGacAAYWTdwlhXD-HT6LLtafMTB_y612SgpFxag3qU", // Replace with your public VAPID key
      privateKey: "p-TkUgtjAAZ6pwzjr1PiPal5JsdG-E4w27bLrM1uU4Q", // Replace with your private VAPID key
    },
    timeout: 5000, // Replace with your desired timeout value
    TTL: 3600, // Replace with your desired TTL value
    headers: {
      // ... custom headers if needed ...
      "Content-Type": "application/json",
    },
    contentEncoding: "aesgcm", // Replace with the desired encoding type
    urgency: "normal", // Replace with 'high' if needed
    topic: "Pembayaran", // Replace with your desired topic
    // ... other options ...
  };
  webpush.sendNotification(pushSubscription, payload, options);
  console.log("sent succesfully");

  // const handleSendNotification = () => {
  // router.push("/");

  return (
    <>
      <p>Terimakasih</p>
    </>
  );
}
