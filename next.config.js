/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
    unoptimized: true,
  },
  modularizeImports: {
    "react-icons": {
      transform: "react-bootstrap/{{member}}",
    },
  },
};

module.exports = nextConfig;
