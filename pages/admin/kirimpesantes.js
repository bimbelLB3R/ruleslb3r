import webpush from "web-push";

export default function kirimpesantes({ biodata }) {
  const data = biodata.map((item) => item[10]);
  const namaUser = biodata.map((item) => item[1]);
  // // console.log(namaUser);
  const parsedData = data
    .filter((item) => item) // Filter out empty strings
    .map((item) => JSON.parse(item)); // Parse JSON strings to objects
  const transformedData = parsedData.map((item, index) => {
    const keysObj = { p256dh: item.keys.p256dh, auth: item.keys.auth };
    const pushSubscription = [
      {
        endpoint: item.endpoint,
        expirationTime: item.expirationTime,
        keys: item.keys,
      },
    ];
    const nama = namaUser[index + 17];
    const payload = `${nama} ,ini dia tips memilih jurusan agar sesuai bakat, minat dan kemampuanmu`;
    return {
      pushSubscription: pushSubscription,
      payload: payload,
    };
  });
  // // Siapkan array untuk menampung semua push subscription dan payload
  const allSubscriptionsAndPayloads = [];
  // // Kumpulkan semua push subscription dan payload dari transformedData ke dalam array
  transformedData.forEach((item) => {
    allSubscriptionsAndPayloads.push({
      pushSubscription: item.pushSubscription,
      payload: item.payload,
    });
  });
  // // Loop melalui semua push subscription dan kirim notifikasi
  // // Loop melalui semua push subscription dan payload, dan kirim notifikasi
  for (const { pushSubscription, payload } of allSubscriptionsAndPayloads) {
    // console.log(payload);
    const options = {
      // ... other options ...
      vapidDetails: {
        subject: "mailto:seftinadwi@gmail.com",
        publicKey: process.env.WEBPUSH_PUBLIC_KEY, // Replace with your public VAPID key
        privateKey: process.env.WEBPUSH_PRIVAT_KEY, // Replace with your private VAPID key
      },
      timeout: 5000, // Replace with your desired timeout value
      TTL: 3600, // Replace with your desired TTL value
      headers: {
        // ... custom headers if needed ...
        "Content-Type": "application/json",
      },
      contentEncoding: "aesgcm", // Replace with the desired encoding type
      urgency: "normal", // Replace with 'high' if needed
      topic: "SNBT", // Replace with your desired topic
      // ... other options ...
    };
    const subscription = pushSubscription[0];
    webpush.sendNotification(subscription, payload, options);
    console.log("Notification sent successfully");
  }

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
