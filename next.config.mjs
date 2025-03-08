/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { defaultLoaders }) => {
    // Add custom Webpack rule for .geojson files
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"],
    });

    // Add custom Webpack rule for .svg files
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        port: "",
        pathname: "/**", // Allow all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**", // Allow all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname: "/**", // Allow all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
