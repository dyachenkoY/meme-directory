import type React from "react";

import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meme Directory",
  description: "A directory of popular memes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-4">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              Meme Directory © {new Date().getFullYear()}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
