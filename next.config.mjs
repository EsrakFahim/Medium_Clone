/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
            domains: ["res.cloudinary.com"], // Add 'res.cloudinary.com' to the allowed domains
      },
      eslint: {
            ignoreDuringBuilds: true,
      },
};

export default nextConfig;
