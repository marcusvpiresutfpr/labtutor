import { updateUserArticle } from "@/lib/db";
import { getServerSession } from "@/lib/auth";

import ErrorPage from "@/components/error";
import Link from "next/link";

const PublishPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getServerSession();
  if (user?.id) {
    let status = "revisão";
    if (Number(user.role) >= 20) status = "publicado";
    await updateUserArticle(params.slug, { status }, user.id);
    return (
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold decoration-success">
              {status === "publicado"
                ? "Publicado com Sucesso"
                : "REVISÃO"}
            </h1>
            <p className="py-6">
              {status === "publicado"
                ? "Parabéns! Seu artigo foi publicado com sucesso e agora está disponível para todos os leitores."
                : "Seu artigo foi enviado para revisão. Nossa equipe está revisando-o antes da publicação."}
            </p>
            <Link href="/tutor/usuario" className="btn btn-primary">concluir</Link>
          </div>
        </div>
      </div>
    );
  } else return <ErrorPage title="Requisição Negada" />;
};

export default PublishPage;
