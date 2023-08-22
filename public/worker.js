self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    badge: "https://bimbellb3r.github.io/img/slider/logolb3r4.png",
  };
  event.waitUntil(
    self.registration.showNotification(
      "Info Tagihan Pembayaran Les Bimbel LB3R",
      options
    )
  );
});

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(
    clients.openWindow("https://www.bimbellb3r.com/layanan/bayarles")
  );
});

// public/service-worker.js

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open("my-cache").then((cache) => {
//       return cache.addAll([
//         "/form/newmember",
//         // Daftar sumber daya yang ingin Anda cache
//         // Misalnya: '/',
//         // '/styles.css',
//         // '/images/logo.png',
//       ]);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

// self.addEventListener("push", (event) => {
//   const options = {
//     body: event.data.text(),
//     icon: "/image/logolb3r.png", // Ganti dengan path menuju ikon notifikasi
//     badge: "/image/logolb3r.png", // Ganti dengan path menuju badge notifikasi
//   };

//   event.waitUntil(
//     self.registration.showNotification("Tagihan Pembayaran", options)
//   );
// });
