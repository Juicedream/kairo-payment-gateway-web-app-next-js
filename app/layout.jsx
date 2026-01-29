import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['100', '300', '500', '700'],
  subsets: ["latin"],
});

export const metadata = {
  title: "Kairo Payment",
  description: "Payment Gateway that makes it easy to track payments",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" data-theme="=aqua">
      <body
        className={`${poppins.className} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
