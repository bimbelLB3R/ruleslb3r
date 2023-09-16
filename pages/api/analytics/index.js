// pages/api/gaData.js
import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    // Inisialisasi klien Google Analytics
    const auth = await authorize();
    const analyticsreporting = google.analyticsreporting({
      version: "v4",
      auth,
    });

    // Buat permintaan ke Google Analytics
    const response = await analyticsreporting.reports.batchGet({
      reportRequests: [
        {
          viewId: "G-DYQLVBYP7G", // Ganti dengan viewId Anda
          dateRanges: [{ endDate: "yesterday", startDate: "7daysAgo" }],
          metrics: [{ expression: "ga:pageviews" }], // Hanya mengambil data pageviews
        },
      ],
    });

    // Kirim respons ke klien
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function authorize() {
  // Implementasi autentikasi di sini sesuai dengan kebutuhan Anda
  // Anda dapat menggunakan OAuth 2.0 atau API Key
  // Pastikan kredensial Anda diatur dengan benar
  // Menggunakan google.auth untuk mengautentikasi
  // Menggunakan API Key untuk autentikasi
  const clientEmail = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, "\n"), // Mengganti karakter \n yang dilakukan otomatis oleh .env
    },
    scopes: "https://www.googleapis.com/auth/analytics.readonly",
  });

  return auth;
}
