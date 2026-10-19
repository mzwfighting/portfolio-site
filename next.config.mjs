/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  devIndicators: false,
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: "/assets/**"
      }
    ]
  }
};

export default nextConfig;
