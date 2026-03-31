import Header from "./components/Header";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import BrightHomeProvider from "./components/BrightHomeProvider";
import { Hanken_Grotesk, Yeseva_One } from "next/font/google";
import "./globals.css";

const hanken_grotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-hanken-grotesk',
});

const yeseva_one = Yeseva_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-yeseva-one',
});

export const viewport = {
  icons: {
    icon: [
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon.svg" },
    ],
  }
};


export const metadata = {
  title: "Giftflow",
  description: "WordPress plugin for managing donations, donors, and campaigns with modern features and extensible architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${hanken_grotesk.variable} ${yeseva_one.variable} antialiased`}
      >
        <BrightHomeProvider>
          <TopBar />
          <Header />
          <div className="pt-[var(--giftflow-header-stack)]">{children}</div>
          <Footer />
        </BrightHomeProvider>
      </body>
    </html>
  );
}
