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
import WhatsAppIcon from "@/components/common/icons/Whatsapp";
import InstagramIcon from "@/components/common/icons/Instagram";
import CallIcon from "@/components/common/icons/Call";

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
          content="Embark on unforgettable journeys with Wander Wild Adventures. Discover breathtaking destinations, thrilling outdoor experiences, and curated trips designed for adventure lovers. Book your next escapade and create memories that will last a lifetime with us today!"
        />
        <meta
          name="keywords"
          content="adventure, activities, adventurers, adventures, bhandhavgarh, blogs, boating, book, camping, cancel, choose, community, companion, contact, curated, days, destinations, details, discover, diversity, diving, download, drives, embark, endless, ensure, experience, experiences, explore, explorers, extraordinary, faqs, fellow, flights, flyboarding, fostering, gallery, gems, giant, hidden, himachal, home, house, iconic, ignite, immersive, inception, included, india, inspiring, journeys, khajuraho, kickstart, landmarks, main, menu, need, night, nights, offer, open, package, packages, paragliding, passion, pench, policy, popular, possibilities, pradesh, price, provide, rafting, rated, reschedule, reserve, river, scuba, selection, share, skydiving, swing, team, thrilling, tiger, tour, travel, travelers, trending, trip, ultimate, unforgettable, uttrakhand, view, wander, wanderlust, wild, world, worldwide"
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
        <WhatsAppIcon />
        <InstagramIcon />
        {/* <CallIcon /> */}
      </body>
    </html>
  );
}
