import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateArticle = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    const result = await prisma.article.create({
      data: {
        title: "title",
        content: "content",
        author: { connect: { email: session?.user?.email as string } },
      },
    });
    redirect(`/usuario/artigo/${result.id}`);
  } else redirect("/acesso-restrito");
};

export default CreateArticle;
