/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.IMAGES_DOMAIN],
    hostname: "",
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
