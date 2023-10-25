import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

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
      const userRecord = await prisma.user.findUnique({ where: { email: user.email } });
      return { ...session, user: { ...session.user, role: userRecord?.role } };
    }
  },
};
