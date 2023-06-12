// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

// module.exports = nextConfig;

// custom font

// next.config.js
require('dotenv').config();
module.exports = {
  // konfigurasi images untuk mengambil foto user google dan foto lain dr domain diluar
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'https://api.midtrans.com',
      'api.sandbox.midtrans.com',
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
