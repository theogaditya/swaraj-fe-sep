// apps/web/user-fe/next.config.js
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // your remote host allow-list (unchanged)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "swarajdesk.adityahota.online",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // <<< ADDED: disable Next's server-side image optimization
    // External images will be requested directly by the browser.
    // This prevents the image optimizer from timing out, but you lose server-side optimization.
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://user-be-97618793412.europe-west1.run.app/api/:path*",
      },
    ];
  },

  // Optional: tell Turbopack where your workspace root is (prevents the warning)
  turbopack: {
    root: path.resolve(__dirname, "../../.."),
  },
};

export default nextConfig;
