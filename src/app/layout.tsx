import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { NextAuthProvider } from "./lib/next-auth/provider";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "TODO APP",
  description: "TODOリストを管理できるアプリケーションです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <NextAuthProvider>
          <Header />
          <main className="bg-blue-100 px-2 py-2">
            <div className="max-w-2xl mx-auto">{children}</div>
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
