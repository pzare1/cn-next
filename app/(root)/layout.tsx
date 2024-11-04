import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import AuthContext from "@context/AuthContext";

const geistSans = localFont({
  src: "../fonts/Poppins-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/Poppins-Regular.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cinema Next",
  description: "Movie App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black-1`}
      >
        <AuthContext>
        {children}
        </AuthContext>
      </body>
    </html>
  );
}
