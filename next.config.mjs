/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "1gb",
    },
  },
  images: {
    domains: [
      "t4znbqbrsik9vjxy.public.blob.vercel-storage.com",
    ],
  },
};

export default nextConfig;
