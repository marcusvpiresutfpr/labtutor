// Path: src/pages/api/auth/[...nextauth].ts

import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      // the processing of JWT occurs before handling sessions.
      console.log("jwt callback ", { token, user, session });
      if (user) token.id = user.id;
      return token;
    },

    session: async ({ session, token, user }) => {
      //  The session receives the token from JWT
      console.log("session callback ", { token, user, session });
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          id: token.id,
        },
        error: token.error,
      };
    },
  },
};
