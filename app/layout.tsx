import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixieDream ✨ AI Image Generator",
  description: "Transform your imagination into stunning visuals with AI magic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
