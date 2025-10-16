/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Increase the body size limit to 5 MB
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // Build optimizations
  generateEtags: false, // Disable etag generation for faster builds
};

export default nextConfig;
