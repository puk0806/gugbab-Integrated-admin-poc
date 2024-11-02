import path from 'path';
import { URL } from 'url';
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const __dirname = new URL(".", import.meta.url).pathname;

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'node_modules/@gugbab-integrated-admin-poc/ui-sass')],
  },
  transpilePackages: ["@gugbab-integrated-admin-poc/ui-vanilla-extract"],
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname + "/src");
    return config;
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
};

export default withVanillaExtract(nextConfig);
