"use client";

import Navbar from "@/components/navbar";

import { useEffect, useState } from "react";
import { User, Article } from "@/lib/db/writer";
import ProfileForms from "@/components/profile-forms";

import Link from "next/link";
import toast from "react-hot-toast";
import ArticlesTable from "@/components/article-table";

const UserDashPage = () => {
  const [articles, setArticles] = useState<Article[] | []>([]);
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState("profile");

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/api/writer/article");
      const data = await res.json();
      setArticles(data.articles);
      setUser(data.user);
    };
    fetchArticles();
  }, []);

  const handleDeleteArticle = (id: string) => {
    toast
      .promise(fetch(`/api/writer/article/${id}`, { method: "DELETE" }), {
        loading: "Excluindo artigo...",
        success: "Artigo excluido",
        error: "Não foi possível eliminar o artigo",
      })
      .then(() => {
        const updatedArticles = articles.filter((article) => article.id !== id);
        setArticles(updatedArticles);
      });
  };

  const handleStatusArticle = async (id: string, status: string) => {
    toast
      .promise(
        fetch(`/api/writer/article/${id}`, {
          method: "PUT",
          body: JSON.stringify({ status }),
        }),
        {
          loading: "Actualizando artigo...",
          success: "Artigo atualizado",
          error: "Não foi possível atualizar o artigo",
        }
      )
      .then(() => {
        const updatedArticles = articles.map((article) => {
          if (article.id === id) {
            return { ...article, status };
          }
          return article;
        });
        setArticles(updatedArticles);
      });
  };

  return (
    <div>
      <Navbar />
      <main className="h-screen w-screen flex items-center max-md:justify-center">
        {user ? (
          <>
            <section className={`grow max-w-md flex justify-center items-center flex-col m-4 max-md:${page !== "profile" && "hidden"}`}>
              <ProfileForms user={user} />
            </section>
            <section className={`grow flex justify-center items-center flex-col m-4 max-md:${page !== "articles" && "hidden"}`}>
              <h2 className="text-5xl font-bold mb-12">Artigos</h2>
              <ArticlesTable
                articles={articles}
                handleDeleteArticle={handleDeleteArticle}
                handleStatusArticle={handleStatusArticle}
              />
              <Link
                href="/tutor/escritor/artigo"
                className="btn btn-primary mt-4">
                Criar novo artigo
              </Link>
            </section>
          </>
        ) : (
          <div className="loading loading-infinity loading-lg scale-150 mx-auto"></div>
        )}
      </main>
      <ul className="menu menu-horizontal bg-base-200 fixed bottom-0 left-0 right-0 justify-around md:hidden">
        <li>
          <a
            className={`tooltip ${page === "profile" && "active"}`}
            onClick={() => setPage("profile")}
            data-tip="Perfil">
            <i className="ri-user-3-line mr-2"></i>
            Perfil
          </a>
        </li>
        <li>
          <a
            className={`tooltip ${page === "articles" && "active"}`}
            onClick={() => setPage("articles")}
            data-tip="Artigos">
            <i className="ri-article-line mr-2"></i>
            Artigos
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserDashPage;
