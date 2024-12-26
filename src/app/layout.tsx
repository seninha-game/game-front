import "@/app/globals.css";
import { RaffleProviders, TicketProviders } from "@/context/providers";
import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import React from "react";

const redHat = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seninha bet",
  description: "Sorteio seninha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html style={{ scrollBehavior: "smooth" }} lang="en">
      <body className={redHat.className}>
        <TicketProviders>
          <RaffleProviders>
            <main className="">{children}</main>
          </RaffleProviders>
        </TicketProviders>
      </body>
    </html>
  );
}
