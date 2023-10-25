import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

import { getServerSession as _getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { getUserByEmail } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      const userRecord = await getUserByEmail(user.email);
      return { ...session, user: userRecord };
    },
  },
};

export const getServerSession = async () => (await _getServerSession(authOptions))?.user;
