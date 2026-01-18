import Header from "./components/Header";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
// import { Space_Mono, Google_Sans } from "next/font/google";
import "./globals.css";


export const metadata = {
  title: "Giftflow",
  description: "WordPress plugin for managing donations, donors, and campaigns with modern features and extensible architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-google-sans antialiased`}
      >
        <TopBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
