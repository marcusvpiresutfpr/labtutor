import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createArticle } from "@/lib/db";

import ErrorPage from "@/components/error";

const CreateArticle = async () => {
  const user = await getServerSession();
  if (user?.id) {
    const article = await createArticle(user.id, { title: "Novo artigo", content: "Escreva aqui um artigo super legal 🤩", status: "rascunho" });
    redirect(`/tutor/usuario/artigo/${article.id}`);
  } else return <ErrorPage title="Requisição Negada" />;
};

export default CreateArticle;
