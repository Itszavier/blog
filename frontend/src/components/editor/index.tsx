/** @format */
import style from "./style.module.css";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "../EditorToolbar";
import "./prosemirror.css";

export default function TiptapEditor({ editor }: { editor: Editor }) {
  return (
    <div className={style.editor_wrapper}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className={style.editor} />
    </div>
  );
}
