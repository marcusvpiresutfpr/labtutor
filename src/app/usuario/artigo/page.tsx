import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

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
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Acesso Restrito</h1>
          <p className="py-6">
            Faça o login para continuar ou entre em contato se já estiver logado
            e o erro persistir.
          </p>
          <Link href="/" className="btn btn-primary">
            VOLTAR PARA O INÍCIO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
