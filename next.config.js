/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/:path*', // Proxy to API
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/api/v1/:path*',
  //       headers: [
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: 'http://localhost:5001/:path*', // Set your origin
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET, POST, PUT, DELETE, OPTIONS',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: 'Content-Type, Authorization',
  //         },
  //       ],
  //     },
  //   ];
  // },
  env: {
    apiUrl: 'http://localhost:5001/api/v1',
    siteUrl: 'http://localhost:3000',
  },
};

module.exports = nextConfig;
