/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
    unoptimized: process.env.NODE_ENV !== "production",
  },
  modularizeImports: {
    "react-icons": {
      transform: "react-bootstrap/{{member}}",
    },
  },
};

module.exports = nextConfig;
