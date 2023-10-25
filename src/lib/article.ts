import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const get_article = async (id: string) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (email) {
    const article = await prisma.article.findUnique({
      where: { id: id, author: { email: email } },
      select: {
        id: true,
        title: true,
        content: true,
        author: { select: { email: true } },
      },
    });
    return article;
  } else return null;
};
