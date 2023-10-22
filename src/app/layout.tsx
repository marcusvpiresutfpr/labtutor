import "./globals.css";

import Provider from "../components/provider";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="pt-br" data-theme="bumblebee">
      <body className={inter.className}>
        <Provider session={session}>{props.children}</Provider>
      </body>
    </html>
  );
}
