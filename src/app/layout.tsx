import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { AppProvider } from "@/contexts/AppContext";
import LayoutClient from "@/components/layout/LayoutClient";
import "../styles/globals.scss";

// Load custom fonts
const roobert = localFont({
  src: [
    {
      path: "./fonts/Roobert-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Roobert-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-roobert",
  preload: true,
});

const harmond = localFont({
  src: "./fonts/Harmond-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-harmond",
  preload: true,
});

const roxborough = localFont({
  src: [
    {
      path: "./fonts/RoxboroughCF-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/RoxboroughCF-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-roxborough",
  preload: true,
});

export const metadata: Metadata = {
  title: "Timo Nielsen — Data Scientist & Engineer at McLaren",
  description: "Data Scientist and Engineer at McLaren Automotive with 11+ years of experience in data analytics, machine learning, and engineering solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`ol ol-mobile ${roobert.variable} ${harmond.variable} ${roxborough.variable}`}
        data-barba="wrapper"
        suppressHydrationWarning={true}
      >
        {/* Include Lottie library before React components */}
        <Script src="/js/lottie.min.js" strategy="beforeInteractive" />
        
        <AppProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </AppProvider>
      </body>
    </html>
  );
}
