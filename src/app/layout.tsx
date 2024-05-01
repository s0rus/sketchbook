import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "sketchbook",
  description: "sketchbook - a collection of components written by devsor.us",
  metadataBase: new URL("https://sketchbook.devsor.us"),
  alternates: {
    canonical: "/",
  },
  robots: {
    follow: true,
    index: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": 0,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    images: "/og.jpg",
  },
  icons: {
    icon: {
      sizes: "48x48",
      url: "/favicon.ico",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
