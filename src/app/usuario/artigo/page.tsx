"use client";

import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menubar";
import Link from "next/link";
import React from "react";

import { EditorContent, useEditor } from "@tiptap/react";

const ArticleEditor = () => {
  const [actionLoading, setActionLoading] = React.useState("");
  const [articleId, setArticleId] = React.useState("");
  const [errors, setErrors] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const editor = useEditor({
    extensions: [StarterKit, CharacterCount.configure({ limit: 10000 })],
  });

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActionLoading("save");
    try {
      const content = editor?.getHTML() ?? "";
      const articleData = { title, content };

      if (articleId) {
        const response = await fetch(`/api/article/${articleId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articleData),
        });
        if (response.ok) {
          console.log("Article updated successfully.");
        } else {
          console.error("Failed to update the article.");
        }
      } else {
        const response = await fetch("/api/article", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articleData),
        });
        if (response.ok) {
          const result = await response.json();
          console.log("Article created with ID:", result.article_id);
          setArticleId(result.article_id);
        } else {
          console.error("Failed to create the article.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setActionLoading("");
    }
  };

  if (editor)
    return (
      <main className="min-h-screen min-w-screen flex flex-col items-center bg-base-200">
        <nav className="navbar bg-neutral text-neutral-content">
          <div className="navbar-start">
            <Link
              href="/usuario/artigos"
              className="btn btn-neutral btn-circle text-3xl hover:bg-red-800">
              <i className="ri-close-line"></i>
            </Link>
          </div>

          <div className="navbar-center">LABTUTOR</div>
          <div className="navbar-end">
            <button
              className={`btn ${actionLoading != "" && "opacity-75"}`}
              onClick={handleSave}>
              {actionLoading === "save" ? (
                <span className="loading loading-spinner w-6"></span>
              ) : (
                <i className="ri-save-line w-6"></i>
              )}
              SALVAR
            </button>
            <button
              className={`btn btn-primary ml-4 ${
                actionLoading != "" && "opacity-75"
              }`}>
              <i className="ri-earth-line w-6"></i>
              PUBLICAR
            </button>
          </div>
        </nav>

        <MenuBar editor={editor} />

        <article className="flex-grow m-4" style={{ width: "50rem" }}>
          <input
            type="text"
            placeholder="Escreva o título aqui !"
            className="input input-lg input-bordered w-full rounded-box"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <EditorContent
            className="prose w-full flex-grow max-w-none min-h-screen my-2 flex border-4 rounded-3xl bg-base-100"
            editor={editor}
          />
        </article>
      </main>
    );

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <span className="loading loading-infinity loading-lg"></span>
    </main>
  );
};

export default ArticleEditor;
