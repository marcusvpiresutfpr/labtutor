import prisma from "@/lib/prisma";

import { get_user } from "@/lib/user";
import { redirect } from "next/navigation";

const CreateArticle = async () => {
  const user = await get_user();
  if (user?.email) {
    const result = await prisma.article.create({
      data: {
        title: "Escreva o título do artigo aqui",
        content: "Conteúdo legal... 🤩",
        author: { connect: { email: user?.email as string } },
      },
    });
    redirect(`/tutor/usuario/artigo/${result.id}`);
  } else redirect("/acesso-restrito");
};

export default CreateArticle;
