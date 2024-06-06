/** @format */
import { useEditor } from "@tiptap/react";
import TiptapEditor from "../../components/editor";
import style from "./style.module.css";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "../../components/EditorToolbar";
import { IoMdArrowRoundBack } from "react-icons/io";

const placeholder: string = "Start writing your article here. Use the toolbar above for formatting and paste your content if needed..."


export default function EditorPage() {
  const editor = useEditor({
    extensions: [StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      })
    ],
    autofocus: true, 

  });

  if (!editor) return;

  return (
    <div className={style.container}>
     <div className={style.header}> 
      <div className={style.control}>
        <button className={style.back_btn}><IoMdArrowRoundBack /></button>
        <button className={style.control_btn}>Save daft</button>
        <button className={`${style.control_btn} ${style.publish_btn}`}>Publish</button>
      
      </div>
      <Toolbar editor={editor}/>
      </div>  
      <div className={style.content}>
         <TiptapEditor editor={editor} />s
      </div> 
    </div>
  );
}
