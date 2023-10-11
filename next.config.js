const withPwa = require("next-pwa");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
    unoptimized: true,
  },
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}",
    },
  },
  ...withPwa({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
};

module.exports = nextConfig;
