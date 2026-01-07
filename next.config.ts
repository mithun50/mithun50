import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Only use static export for GitHub Pages
  ...(isGithubPages && { output: "export" }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages - uncomment and set your repo name if deploying to username.github.io/repo-name
  // basePath: "/portfolio",
  // assetPrefix: "/portfolio",
};

export default nextConfig;
