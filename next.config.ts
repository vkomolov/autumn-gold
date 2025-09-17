import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //eslint: { ignoreDuringBuilds: true }, //not to run lint when building
  /* config options here */

  /*  Disable the "plugin not detected" cosmetic warning  */
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    /* other flags, if necessary... */
  },
};

export default nextConfig;
