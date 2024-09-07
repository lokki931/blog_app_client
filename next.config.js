/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: 'http://localhost:5001/api/v1',
    siteUrl: 'http://localhost:3000',
  },
};

module.exports = nextConfig;
