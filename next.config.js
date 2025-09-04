/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: '/weather',        // <- THIS IS REQUIRED
  assetPrefix: isProd ? '/weather/' : '',  // optional for production
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};
