import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  transpilePackages: ['@gugbab-integrated-admin-poc/ui-sass'],
  output: 'standalone',
  turbopack: {
    // Next.js 16: Turbopack root를 명시적으로 지정
    root: path.join(__dirname, '..', '..'),
  },
};

export default nextConfig;
