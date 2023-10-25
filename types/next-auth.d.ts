import NextAuth from "next-auth"

import { User } from "@/lib/db"

declare module "next-auth" {
  interface Session {
    expires: string,
    user: User | null
  }
}
