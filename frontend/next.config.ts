import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  redirects: async () => [
    {
      source: "/documents",
      destination: "/dashboard/documents",
      permanent: true,
    },
    {
      source: "/career",
      destination: "/dashboard/career-progress",
      permanent: true,
    },
    {
      source: "/progress",
      destination: "/dashboard/career-progress",
      permanent: true,
    },
    {
      source: "/analytics",
      destination: "/dashboard/analytics",
      permanent: true,
    },
    {
      source: "/roadmap",
      destination: "/dashboard/roadmap",
      permanent: true,
    },
    {
      source: "/ai-roadmap",
      destination: "/dashboard/roadmap",
      permanent: true,
    },
    {
      source: "/coach",
      destination: "/dashboard/coach",
      permanent: true,
    },
  ],
};

export default nextConfig;
