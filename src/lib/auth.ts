// Path: src/pages/api/auth/[...nextauth].ts

import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getUser } from "@/services/user";

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
    session: async ({ session, token, user }) => {
      //  The session receives the token from JWT
      console.log("session callback ", { token, user, session });
      const userData = getUser(user.email);
      console.log("userData ", userData);
      return {
        ...session,
        user: {
          ...session.user,
          ...userData,
        },
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
};
