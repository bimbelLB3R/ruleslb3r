import { useEffect, useState } from "react";
import webpush from "web-push";

export default function kirimpesan({ biodata }) {
  const data = biodata.map((item) => item[10]);
  // console.log(data);
  const parsedData = data
    .filter((item) => item) // Filter out empty strings
    .map((item) => JSON.parse(item)); // Parse JSON strings to objects
  const transformedData = parsedData.map((item) => {
    const keysObj = { p256dh: item.keys.p256dh, auth: item.keys.auth };
    return {
      endpoint: item.endpoint,
      expirationTime: null,
      keys: keysObj,
    };
  });

  // console.log(transformedData);

  const pushSubscription = transformedData;
  // [
  //   {
  //     endpoint:
  //       "https://fcm.googleapis.com/fcm/send/erzUDBCq8Nk:APA91bGj1Rqq_iDAfj8_AlK8mtB1XPp00EMUdI5wswYfiyhIOg4CZu75nM9EofYADsMNxdeN6IckpiEhdubvL-O6Jh7rBsnKe6IMw1_36CwjxmoE1fPRCtFcvTZPFfsPh9lZbmgLxy3y",
  //     expirationTime: null,
  //     keys: {
  //       p256dh:
  //         "BDUkRPwduISfGtPjKJhIkHqQRrojGvQXda2VMBR8iKPImHfQedQV78eroSy3jrGBn3apI5M0Q0x3y86NZaoB5aQ",
  //       auth: "hnMdvjrRgSu9Nw_wggLrZQ",
  //     },
  //   },
  //   {
  //     endpoint:
  //       "https://fcm.googleapis.com/fcm/send/fzSguidw5Kc:APA91bEPetcbucX75FkzJYN-GqZxCB9NJ8ybP_SaIgND2CoObSlvpppGUu8-3h_ChwyRmGg-rb0zq6wp3yUQZNOi2E7DnW_zAMYvkVNQwphHIZqKeIX8ZZ_EDT5vhYrwNZgth-4GGsdT",
  //     expirationTime: null,
  //     keys: {
  //       p256dh:
  //         "BP0pVPVMQGDsZUYgj9kiqEZ45YLe-TO52tWn5m7fEIizYvxKzsqLv0KePLyPCFTCS9D1gZ70fc2qWXsrIldipdY",
  //       auth: "BkZXqr1w_iWl5C1Jw5uVOg",
  //     },
  //   },
  //   {
  //     endpoint:
  //       "https://fcm.googleapis.com/fcm/send/cFnQ3aWtFQ0:APA91bGsEOOLTt8a7pd2QkHArbshSgSwwCXwPcScVjZQA2u1NtUeoUFEai3Sl8KO47n5KXuNKmA95qHnIJ56d9JgTjNW9qHF1TjA96oxnzfzqL79ZPsB-3q-SlBxH_BLz1aVJJcqotiN",
  //     expirationTime: null,
  //     keys: {
  //       p256dh:
  //         "BPKYYNH0OQUnkFA8uEkP8taPH3etSsNmP6Km37cOIzdUi2hAPEo4r2SiL-JcWraDpeC4m_RM8cOWgGImeq9MZPc",
  //       auth: "rRRaZWSSf-8l31ZGGUU5Kw",
  //     },
  //   },
  // ];

  // const pushSubscription = {
  //   endpoint:
  //     "https://fcm.googleapis.com/fcm/send/erzUDBCq8Nk:APA91bGj1Rqq_iDAfj8_AlK8mtB1XPp00EMUdI5wswYfiyhIOg4CZu75nM9EofYADsMNxdeN6IckpiEhdubvL-O6Jh7rBsnKe6IMw1_36CwjxmoE1fPRCtFcvTZPFfsPh9lZbmgLxy3y",
  //   keys: {
  //     p256dh:
  //       "BDUkRPwduISfGtPjKJhIkHqQRrojGvQXda2VMBR8iKPImHfQedQV78eroSy3jrGBn3apI5M0Q0x3y86NZaoB5aQ",
  //     auth: "hnMdvjrRgSu9Nw_wggLrZQ",
  //   },
  // };

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

  for (const subscription of pushSubscription) {
    webpush.sendNotification(subscription, payload, options);
    console.log("Notification sent successfully");
  }

  // You can trigger sending notifications on component mount or other events

  // webpush.sendNotification(pushSubscription, payload, options);
  // console.log("sent succesfully");

  // const handleSendNotification = () => {
  // router.push("/");

  return (
    <>
      <p>Terimakasih</p>
    </>
  );
}

// ambil data soal
export async function getServerSideProps() {
  const req2 = await fetch(`https://bimbellb3r.com/api/biodata`);
  const res2 = await req2.json();

  return {
    props: {
      biodata: res2.data,
    },
  };
}
