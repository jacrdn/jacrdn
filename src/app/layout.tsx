import type { Metadata } from "next";
import "@/styles/globals.css";
import HeaderWord from "@/components/HeaderWord/HeaderWord";
import Nav from "@/components/Nav/Nav";

export const metadata: Metadata = {
  title: "9xbetter",
  description: "Personal portfolio — 9xbetter.com",
  metadataBase: new URL("https://9xbetter.com"),
  icons: {
    icon: "/favicon.svg",
  },
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
      <body>
        <div style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 100, display: "flex", alignItems: "flex-end", gap: "2rem" }}>
          <HeaderWord />
          <Nav />
        </div>
        {children}
      </body>
    </html>
  );
}
