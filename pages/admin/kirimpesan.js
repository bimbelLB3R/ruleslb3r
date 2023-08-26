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
  const payload =
    "ini dia tips memilih jurusan agar sesuai bakat, minat dan kemampuanmu";
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
    topic: "Pembayaran", // Replace with your desired topic
    // ... other options ...
  };

  for (const subscription of pushSubscription) {
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
