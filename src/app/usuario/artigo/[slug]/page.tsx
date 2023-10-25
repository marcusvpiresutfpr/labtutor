"use client";

import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";
import MenuBar from "./menubar";
import Link from "next/link";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";

const ArticleEditor = ({ params }: { params: { slug: string } }) => {
  const [status, setStatus] = useState<"saving" | "publishing" | false>(false);
  const [title, setTitle] = useState<string>("");

  const id = params.slug;
  const editor = useEditor({
    extensions: [StarterKit, CharacterCount.configure({ limit: 10000 })],
  });

  useEffect(() => {
    if (!editor) return;
    fetch(`/api/article/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editor.commands.setContent(data.content);
        setTitle(data.title);
      });
  }, [editor, id]);
  
  const handleSave = async () => {
    if (status !== false) return;
    setStatus("saving");
    toast
      .promise(
        fetch(`/api/article/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: editor?.getHTML() || "",
            title: title,
          }),
        }),
        {
          loading: "Salvando...",
          success: "Artigo salvo com sucesso!",
          error: "Erro ao salvar o artigo!",
        }
      )
      .finally(() => setStatus(false));
  };

  if (!editor) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen min-w-screen flex flex-col items-center bg-base-200">
      <nav className="navbar bg-neutral text-neutral-content">
        <div className="navbar-start">
          <Link
            href="/usuario/artigos"
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
};

export default ArticleEditor;
