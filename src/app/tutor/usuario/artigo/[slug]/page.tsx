import { getArticleById } from "@/lib/db";
import { redirect } from "next/navigation";

import ArticleEditor from "./editor";
import ErrorPage from "@/components/error";

const ArticleEditorPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const article = await getArticleById(params.slug);
    if (!article || article.status !== "rascunho") throw new Error("Artigo não encontrado!");
    
    return <ArticleEditor article={article} />
  } catch (error: any) {
    return <ErrorPage title="Acesso negado" message="Você não pode editar esse artigo." />;
  }
};

export default ArticleEditorPage;
