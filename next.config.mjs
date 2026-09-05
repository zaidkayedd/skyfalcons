/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Remote hosts for aircraft / network imagery. Add the real Sky Falcons
    // asset host here once assets are hosted remotely, or drop files in /public.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.skyfalcons.com" }
    ]
  }
};
export default nextConfig;
