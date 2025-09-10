import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lashess By Prii — Luxury Lash Salon & App",
  description:
    "Premium eyelash extensions, lifts, and brow services. Book easily with our mobile app.",
  metadataBase: new URL("https://lashess-by-prii.com"),
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Lashess By Prii",
    description:
      "Premium eyelash services with effortless booking via our mobile app.",
    url: "https://lashess-by-prii.com",
    siteName: "Lashess By Prii",
    images: [
      { url: "/og-banner.png", width: 1200, height: 630, alt: "Lashess By Prii" },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
