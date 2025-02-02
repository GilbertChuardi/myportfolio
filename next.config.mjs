/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"],
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["png.pngtree.com", "flagcdn.com"],
  },
};

export default nextConfig;
