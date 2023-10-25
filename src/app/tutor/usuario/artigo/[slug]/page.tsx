import { get_article } from "@/lib/article";
import { redirect } from "next/navigation";

import ArticleEditor from "./editor";

const ArticleEditorPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const article = await get_article(params.slug);
    if (!article) throw new Error("Artigo não encontrado!");
    
    return <ArticleEditor article={article} />
  } catch (error: any) {
    redirect("/acesso-restrito");
  }
};

export default ArticleEditorPage;
