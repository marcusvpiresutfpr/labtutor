"use client";

import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import InputTitle from "./input-title";
import MenuBar from "./menubar";
import React from "react";

import { EditorContent, useEditor } from "@tiptap/react";

type EditorProps = {
  content?: string;
};

const ArticleEditor = ({ content = "" }: EditorProps) => {
  const [title, setTitle] = React.useState("");

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
    <div className="max-w-5xl flex flex-col justify-items-center my-20 mx-10">
      {editor && <MenuBar editor={editor} />}
      <InputTitle title={title} onChange={setTitle} />
      <EditorContent className="prose flex-grow border-2 rounded-md p-4 max-w-none flex flex-col" editor={editor} />
    </div>
  );
}

export default ArticleEditor;
