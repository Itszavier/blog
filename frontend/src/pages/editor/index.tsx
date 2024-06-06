/** @format */
import { useEditor } from "@tiptap/react";
import TiptapEditor from "../../components/editor";
import style from "./style.module.css";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "../../components/EditorToolbar";
import { IoMdArrowRoundBack } from "react-icons/io";
export default function EditorPage() {
  const editor = useEditor({
    extensions: [StarterKit,
      Placeholder.configure({
        placeholder: "Time to let your ideas flow!"
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      })
    ],
  });

  if (!editor) return;

  return (
    <div className={style.container}>
      <div className={style.control}>
        <button className={style.back_btn}><IoMdArrowRoundBack /></button>
        <button className={style.control_btn}>Save daft</button>
        <button className={`${style.control_btn} ${style.publish_btn}`}>Publish</button>
      </div>
   <div className={style.wrapper}>
         <Toolbar editor={editor}/>
         <TiptapEditor editor={editor} />
      </div>
    </div>
  );
}
