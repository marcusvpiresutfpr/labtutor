"use client";

import { Article } from "@/lib/db/writer";
import Link from "next/link";

interface TableProps {
  articles: Article[];
  handleDeleteArticle: (id: string) => void;
  handleStatusArticle: (id: string, status: string) => void;
}

interface DropdowmProps {
  article: Article;
  handleDeleteArticle: (id: string) => void;
  handleStatusArticle: (id: string, status: string) => void;
}

const Dropdowm = (props: DropdowmProps) => (
  <details className="dropdown">
    <summary className="m-1 btn rounded-full btn-ghost"><i className="ri-settings-3-line text-xl"></i></summary>
    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
      <li><Link href={`/tutor/escritor/artigo/${props.article.id}`}>Editar</Link></li>
      <li onClick={() =>
        props.handleStatusArticle(props.article.id, "público")
      }><button>Publicar</button></li>
      <li onClick={() => props.handleDeleteArticle(props.article.id)}><button>Excluir</button></li>
    </ul>
  </details>
);

const ArticlesTable = (props: TableProps) => {
  return (
    <div className="">
      <table className="table">
        <thead>
          <tr>
            <th className="w-80">TÍTULO</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.articles.map((article) => (
            <tr key={article.id}>
              <th className="w-80">{article.title}</th>
              <th>{article.status}</th>
              <th>
                <Dropdowm
                  article={article}
                  handleDeleteArticle={props.handleDeleteArticle}
                  handleStatusArticle={props.handleStatusArticle}
                />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesTable;
