/** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa')({
//   dest: 'public'
// })


const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "media.istockphoto.com",
      "img1.ak.crunchyroll.com",
      "img.freepik.com",
      "miro.medium.com",
      "2.bp.blogspot.com",
      "dazedimg-dazedgroup.netdna-ssl.com",
      "cdn.iconscout.com",
      "localhost",
      "backend.itsheba.com.bd",
      "backend.tutorsheba.com",
      "cdn4.iconfinder.com",
      "localhost:8000",
    ],
  },
  env: {
    // domain: "http://localhost:8000/",
    domain: "https://backend.tutorsheba.com/",
  },
};

module.exports = nextConfig;
