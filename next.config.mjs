/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Increase the body size limit to 5 MB
    },
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['lucide-react', '@radix-ui/react-accordion'], // Optimize specific packages
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'], // Optimize image formats
  },

  // Build optimizations
  output: 'standalone', // Optimize for deployment
  generateEtags: false, // Disable etag generation for faster builds

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    // Tree shaking optimizations
    config.optimization.innerGraph = true;

    return config;
  },
};

// Enable bundle analyzer when ANALYZE=true
const finalConfig = process.env.ANALYZE === 'true'
  ? {
      ...nextConfig,
      experimental: {
        ...nextConfig.experimental,
        bundleAnalyzer: {
          enabled: true,
          openAnalyzer: true,
        },
      },
    }
  : nextConfig;

export default finalConfig;
