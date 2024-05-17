import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/header/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wander Wild Adventures",
  description: "The best tourism app for adventure travels!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Discover the best adventure travel experiences with Wander Wild Adventures. Book your next adventure with us!"
        />
        <meta
          name="keywords"
          content="adventure travel, tourism, travel app, bookings, adventure tours"
        />
        <meta name="author" content="Wander Wild Adventures" />

        <meta property="og:title" content="Wander Wild Adventures" />
        <meta
          property="og:description"
          content="The best tourism app for adventure travels!"
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://wanderwildadventures.in" />
        <meta property="og:type" content="website" />
        <title>Wander Wild Adventures</title>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <Header />
              <div className="layout_container">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>
              <Footer />
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
