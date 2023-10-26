import ErrorPage from "@/components/error";
import { createArticle } from "@/lib/db/writer";
import { redirect } from "next/navigation";

const createArticlePage = async () => {
  const { article, user } = await createArticle();
  if (article && user) {
    redirect(`/tutor/escritor/artigo/${article.id}`);
  } else return <ErrorPage title="Requisição Negada" />;
};

export default createArticlePage;
