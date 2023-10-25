import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  role: string;
}

export const get_user = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
