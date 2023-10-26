import { getArticle } from "@/lib/db/writer";

import ArticleEditor from "@/app/tutor/escritor/artigo/[slug]/editor";
import ErrorPage from "@/components/error";

const ArticleEditorPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const { article, user } = await getArticle(params.slug);
    if (!user || !article) throw new Error("Artigo não encontrado!")    
    return <ArticleEditor article={article} />
  } catch (error: any) {
    return <ErrorPage title="Acesso negado" message="Você não pode editar esse artigo." />;
  }
};

export default ArticleEditorPage;
