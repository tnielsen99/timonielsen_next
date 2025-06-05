import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Transition from "@/components/layout/Transition";
import Loader from "@/components/layout/Loader";
import MobileMenu from "@/components/layout/MobileMenu";
import Preloader from "@/components/animations/Preloader";
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
      >
        <AppProvider>
          <Preloader />
          <Transition />
          <Loader />
          <div data-scroll-container>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
          <MobileMenu />
        </AppProvider>
        
        {/* Include Lottie library for animations */}
        <script src="/js/lottie.min.js" />
      </body>
    </html>
  );
}
