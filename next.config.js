/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: '',        // <- THIS IS REQUIRED
  assetPrefix: '',  // optional for production
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};
