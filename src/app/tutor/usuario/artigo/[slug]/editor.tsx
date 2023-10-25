"use client";

import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menubar";
import toast from "react-hot-toast";
import Link from "next/link";

import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";
import { Article } from "@/lib/db";

interface ArticleEditorProps {
  article: Article;
}

const ArticleEditor = ({ article }: ArticleEditorProps) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(article.title);
  const editor = useEditor({
    extensions: [StarterKit, CharacterCount.configure({ limit: 10000 })],
    content: article.content,
  });

  const handleSave = async () => {
    if (disabled) return;
    setDisabled(true);
    const articleData = {
      content: editor?.getHTML() || "",
      title: title,
    }
    toast
      .promise(
        fetch(`/api/article/${article.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articleData),
        }).then(async (res) => console.log(await res.json())),
        {
          loading: "Salvando...",
          success: "Artigo salvo com sucesso!",
          error: "Erro ao salvar o artigo!",
        }
      )
      .finally(() => setDisabled(false));
  };

  if (editor) {
    return (
      <main className="min-h-screen min-w-screen flex flex-col items-center bg-base-200">
        <nav className="navbar bg-neutral text-neutral-content">
          <div className="navbar-start">
            <Link
              href="/tutor/usuario"
              className="btn btn-neutral btn-circle text-3xl hover-bg-red-800">
              <i className="ri-close-line"></i>
            </Link>
          </div>
          <div className="navbar-center">LABTUTOR</div>
          <div className="navbar-end">
            <button className={`btn`} onClick={handleSave}>
              <i className="ri-save-line w-6"></i>
              SALVAR
            </button>
            <button
              className={`btn btn-primary ml-4`}
              onClick={() => toast("Here is your toast.")}>
              <i className="ri-earth-line w-6"></i>
              PUBLICAR
            </button>
          </div>
        </nav>
        <MenuBar editor={editor} />
        <article className="flex-grow m-4" style={{ width: "50rem" }}>
          <input
            type="text"
            placeholder="Escreva o título aqui!"
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
  }
};

export default ArticleEditor;
