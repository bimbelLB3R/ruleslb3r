// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

// module.exports = nextConfig;

// custom font

// next.config.js
require("dotenv").config();
module.exports = {
  // konfigurasi images untuk mengambil foto user google
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "https://www.bimbellb3r.com/favicon.ico",
      "drive.google.com",
      "unsplash.com",
      "https://kevin-lehner.com",
      "scontent.cdninstagram.com",
      "https://raw.githubusercontent.com",
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
    }

    return config;
  },
};
