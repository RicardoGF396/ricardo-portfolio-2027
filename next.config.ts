import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 defaults this to [75] and coerces anything else down to it, so
     * 90 has to be declared — the design shots are text-heavy screenshots and
     * 75 smears their small type. */
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.untitledui.com",
        pathname: "/images/**",
      },
    ],
  },
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
