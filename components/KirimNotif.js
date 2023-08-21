import push from "web-push";

function KirimNotif() {
  // const handleSendNotification = async () => {

  const pushSubscription = {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/dD8dJyHBq5w:APA91bGLNVoWXIeVRt6w3erSPlUJdGtTl4-z6dgInbbfhFsifRL8msdvT-DlGjkN3W35XrY0NIkSzet-vJCReVR43EyEdcZPbkF-Q52iuTdQLt-XGjNn4fhuoGKjJLS4xQ5k-R-znVzG",
    keys: {
      p256dh:
        "BAMGC1JgucwhbJxfaVaRpNKADyVc7KGyopvkAsAAChn5cLTtRJRZybIR6ZeGKlTKvJnsEjY4TX4EsrPm9bUuU-A",
      auth: "TbijJI-546IP-b7Z75ia5g",
    },
  };

  const payload = "Halooo ini notifikasi";

  const options = {
    // ... other options ...
    vapidDetails: {
      subject: "mailto:your@email.com",
      publicKey:
        "BF_iaXMcfVjq42wC7dpLb_gfrkzuHsjBuz3THvJ-uHHzbyGacAAYWTdwlhXD-HT6LLtafMTB_y612SgpFxag3qU", // Replace with your public VAPID key
      privateKey: "p-TkUgtjAAZ6pwzjr1PiPal5JsdG-E4w27bLrM1uU4Q", // Replace with your private VAPID key
    },
    timeout: 5000, // Replace with your desired timeout value
    TTL: 3600, // Replace with your desired TTL value
    headers: {
      // ... custom headers if needed ...
    },
    contentEncoding: "aesgcm", // Replace with the desired encoding type
    urgency: "normal", // Replace with 'high' if needed
    topic: "Pembayaran", // Replace with your desired topic
    // ... other options ...
  };

  // push.sendNotification(pushSubscription, payload, options);

  return (
    <div>
      {/* ... */}
      <button
      // onClick={handleSendNotification}
      // disabled={notificationPermission !== "granted"}
      >
        Kirim Push Notification
      </button>
    </div>
  );
}

export default KirimNotif;
