/** @type {import('next').NextConfig} */
const redirects = [
  "/online-teleprompter",
  "/free-teleprompter",
  "/teleprompter-for-youtube",
  "/teleprompter",
].map((source) => ({
  source,
  destination: "/",
  permanent: true
}));

const spanishRedirects = [
  "/es/online-teleprompter",
  "/es/free-teleprompter",
  "/es/teleprompter-for-youtube",
  "/es/teleprompter",
].map((source) => ({
  source,
  destination: "/es",
  permanent: true
}));

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true
  },
  async redirects() {
    return [...redirects, ...spanishRedirects];
  }
};

export default nextConfig;
