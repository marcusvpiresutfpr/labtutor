"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Article } from "@/lib/db";

import toast from "react-hot-toast";
import Link from "next/link";

const DetailsModal = ({ article }: { article: Article | null }) => {
  const router = useRouter();

  const deleteArticle = () => {
    const modal: any = document.getElementById("my_modal_3");
    modal?.close();
    toast
      .promise(
        fetch(`/api/article/${article?.id}`, {
          method: "DELETE",
        }),
        {
          loading: "Excluindo...",
          success: "Artigo excluído com sucesso",
          error: "Erro ao excluir o artigo",
        }
      )
      .then(() => {
        router.refresh();
      });
  };

  const unpublishArticle = () => {
    const modal: any = document.getElementById("my_modal_3");
    modal?.close();
    toast
      .promise(
        fetch(`/api/article/${article?.id}`, {
          method: "PUT",
          body: JSON.stringify({ status: "rascunho" }),
        }),
        {
          loading: "Retornando para rascunho...",
          success: "Artigo convertido para rascunho com sucesso",
          error: "Erro ao despublicar o artigo",
        }
      )
      .then(() => {
        router.refresh();
      });
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{article?.title}</h3>
          <p className="py-4 truncate ">{article?.content?.slice(0, 100)}</p>
          <div className="flex justify-center">
            {article?.status === "rascunho" ? (
              <>
                <Link
                  href={`/tutor/usuario/artigo/${article?.id}`}
                  className="btn btn-primary">
                  EDITAR
                </Link>
                <Link
                  href={`/tutor/usuario/artigo/${article?.id}/publicar`}
                  className="btn btn-info ml-4">
                  PUBLICAR
                </Link>
              </>
            ) : (
              <button className="btn btn-warning" onClick={() => unpublishArticle()}>DESPUBLICAR</button>
            )}
            <button
              className="btn btn-error ml-4"
              onClick={() => deleteArticle()}>
              EXCLUIR
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

const ArticlesTable = ({ articles }: { articles: Article[] }) => {
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  return (
    <section className="grow flex justify-center items-center flex-col m-4">
      <DetailsModal article={currentArticle} />
      <h2 className="text-5xl font-bold mb-12">Artigos</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="w-80">TÍTULO</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <th className="w-80">{article.title}</th>
                <th>{article.status}</th>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      const modal: any = document.getElementById("my_modal_3");
                      setCurrentArticle(article);
                      modal?.showModal();
                    }}>
                    detalhes
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ArticlesTable;
