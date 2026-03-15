import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "9xbetter",
  description: "Personal portfolio — 9xbetter.com",
  metadataBase: new URL("https://9xbetter.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/Ballet-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/NewEdge666-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
