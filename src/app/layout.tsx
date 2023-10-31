import "remixicon/fonts/remixicon.css";
import "@/styles/globals.css";


import { NextAuthProvider } from "./providers";
import { Toaster } from "react-hot-toast";
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
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
