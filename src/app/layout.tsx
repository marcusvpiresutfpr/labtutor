import "@/styles/globals.css";

import { Inter } from "next/font/google";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Labtutor",
  description: "",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
