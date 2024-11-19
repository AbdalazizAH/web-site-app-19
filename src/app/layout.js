import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/shared/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "متجر المنتجات",
  description: "متجر إلكتروني للمنتجات المتنوعة",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-hidden`}
      >
        <Navbar />
        <main className="h-[calc(100vh-4rem)] bg-background pt-16 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </body>
    </html>
  );
}
