import { get_article } from "@/lib/article";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import ArticleEditor from "./editor";

const CreateArticle = async ({ params }: { params: { slug: string } }) => {
  try {
    const article = await get_article(params.slug);
    if (!article) throw new Error("Artigo não encontrado!");

    return (
      <Suspense
        fallback={
          <main className="h-screen w-screen flex items-center justify-center">
            <span className="loading loading-infinity loading-lg scale-150"></span>
          </main>
        }>
        <ArticleEditor article={article} />
      </Suspense>
    );
  } catch (error: any) {
    redirect("/acesso-restrito");
  }
};

export default CreateArticle;
