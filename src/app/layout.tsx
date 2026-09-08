import type { Metadata } from "next";
import { Inter, Playfair_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['500', '600', '700', '800'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-ibm-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: "MSA Traders | Premium Medical Equipment Importers",
  description: "Pakistan's trusted source for imported medical equipment. Ultrasound machines, anesthesia systems, OT lights, C-arms, patient monitors and more. Serving hospitals nationwide — quality guaranteed.",
  keywords: "medical equipment, Pakistan, ultrasound, anesthesia, OT lights, C-arm, patient monitor, imported medical machines, MSA Traders",
  openGraph: {
    title: "MSA Traders | Premium Medical Equipment Importers",
    description: "Pakistan's trusted source for imported medical equipment. Serving hospitals nationwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable} ${ibmPlexMono.variable}`}>
      <body className={inter.className}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontSize: '14px',
              padding: '12px 16px',
            },
          }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
