import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import Footer from "./_components/Footer";
// import ScrollToTop from "./_components/ScrollToTop";
import Loader from "./_components/Loader";
import AppLoader from "./_components/AppLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <link
        precedence="default"
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      />
      <body className="min-h-screen bg-surface text-on-surface font-sans selection:bg-primary selection:text-surface antialiased">
        <AppLoader>

          <div className="grid-overlay fixed inset-0 pointer-events-none opacity-25 z-0" />

          <Header />
          {/* <ScrollToTop /> */}

          <div className="flex-grow flex pt-20 relative z-10">
            <Sidebar />

            <main className="flex-grow p-6 md:p-12 lg:p-16 lg:ml-80 w-full overflow-hidden">
              {children}
            </main>
          </div>

          <Footer />

        </AppLoader>

      </body>
    </html>
  );
}