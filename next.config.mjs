/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ps.w.org',
        pathname: '/giftflow/assets/**',
      },
    ],
  },
};

export default nextConfig;
