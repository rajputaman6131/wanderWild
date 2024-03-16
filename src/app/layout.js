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
