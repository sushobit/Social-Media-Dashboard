import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css"; 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Dashboard",
  description: "A powerful social media dashboard",
  icons: {
    icon: "/logo.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Social Media Dashboard</title>
        <meta name="description" content="A powerful social media dashboard" />
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="bg-gray-900 text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
