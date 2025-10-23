import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ only standard options for Next.js 15
  reactStrictMode: true,

  // Example of other standard options (uncomment if necessary)
  // images: {
  //   domains: ['example.com'],
  // },
  // output: 'standalone',
  // poweredByHeader: false,

  /*  Disable the "plugin not detected" cosmetic warning  */
  eslint: { ignoreDuringBuilds: true }, //not to run lint when building
  experimental: {
    /* other flags, if necessary... */
  },
  /* config options here */
};

export default withNextVideo(nextConfig);
