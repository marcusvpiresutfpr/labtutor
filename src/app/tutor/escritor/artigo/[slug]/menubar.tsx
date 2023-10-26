import React, { Fragment } from "react";
import MenuItem from "./menuitem";

import { Editor } from "@tiptap/react";
import Link from "next/link";

interface MenuItemProps {
  editor: Editor;
}

const MenuBar = ({ editor }: MenuItemProps) => {
  const items = [
    [
      {
        icon: "bold",
        title: "Negrito",
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive("bold"),
      },
      {
        icon: "italic",
        title: "Itálico",
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive("italic"),
      },
      {
        icon: "strikethrough",
        title: "Riscado",
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive("strike"),
      },
      {
        icon: "code-view",
        title: "Código",
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: () => editor.isActive("code"),
      },
    ],
    [
      {
        icon: "h-1",
        title: "Título 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive("heading", { level: 1 }),
      },
      {
        icon: "h-2",
        title: "Título 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive("heading", { level: 2 }),
      },
      {
        icon: "paragraph",
        title: "Parágrafo",
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: () => editor.isActive("paragraph"),
      },
      {
        icon: "list-unordered",
        title: "Lista com Marcadores",
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive("bulletList"),
      },
      {
        icon: "list-ordered",
        title: "Lista Numerada",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive("orderedList"),
      },
      {
        icon: "code-box-line",
        title: "Bloco de Código",
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => editor.isActive("codeBlock"),
      },
    ],
    [
      {
        icon: "double-quotes-l",
        title: "Citação em Bloco",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive("blockquote"),
      },
      {
        icon: "separator",
        title: "Régua Horizontal",
        action: () => editor.chain().focus().setHorizontalRule().run(),
      },
      {
        icon: "text-wrap",
        title: "Quebra de Linha",
        action: () => editor.chain().focus().setHardBreak().run(),
      },
      {
        icon: "format-clear",
        title: "Limpar Formatação",
        action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
    ],
    [
      {
        icon: "arrow-go-back-line",
        title: "Desfazer",
        action: () => editor.chain().focus().undo().run(),
      },
      {
        icon: "arrow-go-forward-line",
        title: "Refazer",
        action: () => editor.chain().focus().redo().run(),
      },
    ],
  ];

  return (
    <>
      <div className="sticky top-0 z-20 menu menu-horizontal bg-base-200 w-full lg:hidden">
        <div className="carousel w-full">
          {items.map((section, index) => {
            const next = index + 1 > items.length ? 0 : index + 1;
            const prev = index - 1 < 0 ? items.length - 1 : index - 1;
            return (
              <div
                key={index}
                id={"slide" + index}
                className="carousel-item relative w-full overflow-hidden">
                <div className="w-full flex justify-center">
                  {section.map((item, index) => (
                    <Fragment key={index}>
                      <MenuItem {...item} />
                    </Fragment>
                  ))}
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <Link href={`#slide${prev}`} className="btn btn-circle">
                    ❮
                  </Link>
                  <Link href={`#slide${next}`} className="btn btn-circle">
                    ❯
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ul
        id="toolbar"
        className={`z-20 menu menu-horizontal bg-base-200 w-full sticky top-0 justify-center flex-nowrap overflow-auto invisible-scrollbar max-lg:hidden`}>
        {items.map((section, index) => (
          <Fragment key={index}>
            {index !== 0 && <div className="divider divider-horizontal" />}
            {section.map((item, index) => (
              <Fragment key={index}>
                {" "}
                <MenuItem {...item} />{" "}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export default MenuBar;
