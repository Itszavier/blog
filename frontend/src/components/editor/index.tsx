/** @format */
import style from "./style.module.css";
import { EditorContent, Editor } from "@tiptap/react";

import "./prosemirror.css";

export default function TiptapEditor({ editor }: { editor: Editor }) {
  return  <EditorContent editor={editor} className={style.editor} />
}
