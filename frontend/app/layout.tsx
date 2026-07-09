import type { Metadata, Viewport } from "next";

import { Providers } from "@/providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | MR:EGO",
    default: "MR:EGO - Design OS for Professional Growth",
  },
  description: "Design OS for Professional Growth",
  metadataBase: new URL(process.env["NEXT_PUBLIC_APP_URL"] ?? "http://localhost:3000"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
