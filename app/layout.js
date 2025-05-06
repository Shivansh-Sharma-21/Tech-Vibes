import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tech Vibes",
  description: "A Blog Which Will make you fall in love with coding!!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="yMK-hRTtGzrHKfmUOCl6ux80PRnnmz8Uy-eBLIer-I4" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-CZ4CB0P6HR"></Script>
        <Script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-CZ4CB0P6HR');
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="pt-24">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
