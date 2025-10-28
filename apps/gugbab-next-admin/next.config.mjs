import path from 'path';
import { URL } from 'url';
// import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const __dirname = new URL('.', import.meta.url).pathname;

// const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      enabled: true,
    },
  },
  reactStrictMode: false,
  // rewrites() {
  //   return [
  //     {
  //       source: '/proxy/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_FRONT_URL}/:path*`,
  //     },
  //   ];
  // },
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'node_modules/@gugbab-integrated-admin-poc/ui-sass'),
    ],
  },
  transpilePackages: ['@gugbab-integrated-admin-poc/ui-sass'],
  output: 'standalone',
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname + '/src');
    return config;
  },
};

// export default withVanillaExtract(nextConfig);
export default nextConfig;
