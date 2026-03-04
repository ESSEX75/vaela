import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
import './src/env';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.yandex.net',
      },
      {
        protocol: 'https',
        hostname: '**.userapi.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
