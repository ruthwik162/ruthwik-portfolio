/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
