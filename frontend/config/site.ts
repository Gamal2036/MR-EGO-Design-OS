export const siteConfig = {
  name: "MR:EGO",
  description: "Design OS for Professional Growth",
  url: process.env["NEXT_PUBLIC_APP_URL"] ?? "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/anomalyco/mr-ego",
  },
} as const;
