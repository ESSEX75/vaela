import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
import './src/env';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

export default withNextIntl(nextConfig);
