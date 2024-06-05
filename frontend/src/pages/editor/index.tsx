/** @format */
import { useEditor } from "@tiptap/react";
import TiptapEditor from "../../components/editor";
import style from "./style.module.css";
import { StarterKit } from "@tiptap/starter-kit";
import EditorPreview from "../../components/editorPreview";

export default function EditorPage() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>hello world</p>",
  });

  if (!editor) return;

  return (
    <div className={style.container}>
      <TiptapEditor editor={editor} />
      <EditorPreview content={editor.getHTML()} />
    </div>
  );
}
