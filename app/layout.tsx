import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lashess By Prii: Aplicación y Salón de Pestañas de Lujo",
  description:
    "Extensiones de pestañas, lifting y cejas premium. Reserva fácilmente con nuestra app móvil.",
  metadataBase: new URL("https://lashees-by-prii.com"),
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Lashess By Prii: Aplicación y Salón de Pestañas de Lujo",
    description:
      "Extensiones de pestañas, lifting y cejas premium. Reserva fácilmente con nuestra app móvil.",
    url: "https://www.lashees-by-prii.exagon-soft.com/",
    siteName: "Lashess By Prii",
    images: [
      {
        url: "https://www.lashees-by-prii.exagon-soft.com/grafic-function.png", // full URL required
        width: 1200,
        height: 628,
        alt: "Lashess By Prii",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lashess By Prii: Aplicación y Salón de Pestañas de Lujo",
    description:
      "Extensiones de pestañas, lifting y cejas premium. Reserva fácilmente con nuestra app móvil.",
    site: "@lashessbyprii", // optional, your Twitter handle
    images: ["https://www.lashees-by-prii.exagon-soft.com/grafic-function.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="absolute inset-0 -z-10">
            <Image
              src="/hero-pattern.svg"
              alt=""
              fill
              priority
              className="object-cover opacity-20 dark:opacity-30 bg-repeat-y"
            />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
