/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "encrypted-tbn0.gstatic.com",
        },
      ],
    },
  };
  
  export default nextConfig;