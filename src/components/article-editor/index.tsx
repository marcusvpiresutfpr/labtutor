"use client";

import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menubar";
import React from "react";

import { EditorContent, useEditor } from "@tiptap/react";

type EditorProps = {
  content?: string;
};

const ArticleEditor = ({ content = "" }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content,
  });

  return (
    <div className="w-full editor p-3 h-full">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

export default ArticleEditor;
