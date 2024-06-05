/** @format */

import { Editor } from "@tiptap/react";
import style from "./style.module.css";

interface IToolbarProps {
  editor: Editor;
}

export default function Toolbar({ editor }: IToolbarProps) {
  return (
    <div className={style.toolbar}>
      <div className={style.section}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${style.button} ${editor.isActive("bold") ? style.active : ""}`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${style.button} ${editor.isActive("italic") ? style.active : ""}`}
        >
          I
        </button>
      </div>
    </div>
  );
}
