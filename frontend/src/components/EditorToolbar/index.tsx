/** @format */

import { Editor } from "@tiptap/react";
import style from "./style.module.css";
import { FaBold, FaItalic } from "react-icons/fa";
import { ImParagraphRight } from "react-icons/im";
import { ImParagraphLeft } from "react-icons/im";
import { ImParagraphCenter } from "react-icons/im";
import {FaRedo, FaUndo}from "react-icons/fa";
interface IToolbarProps {
  editor: Editor;
}

export default function Toolbar({ editor }: IToolbarProps) {

  const handleAlign = (e: React.MouseEvent<HTMLButtonElement> ) => {
    editor.commands.setTextAlign(e.currentTarget.name)
    editor.chain().focus().run();
  }
  return (
    <div className={style.toolbar}>
      <div className={style.section}>
        <div className={`${style.tool_container}  ${style.history_container}`}>
        <button
          onClick={() => editor.commands.undo()}
          className={`${style.button} ${style.history}`}
        >
          <FaUndo />
        </button>

         <button
          onClick={() => editor.commands.redo()}
          className={`${style.button} ${style.history}`}
        >
          <FaRedo />
        </button>
        </div>
        <div className={`${style.tool_container}`}>
          <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${style.button} ${editor.isActive("bold") ? style.active : ""}`}
        >
          <FaBold/>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${style.button} ${editor.isActive("italic") ? style.active : ""}`}
        >
          <FaItalic/> 
        </button>
        </div>
        
        <div className={`${style.tool_container}`}>
          <button name="left" onClick={handleAlign} className={`${style.button}`}>
            <ImParagraphLeft />
        </button>
        
        <button name='center' onClick={handleAlign} className={`${style.button} ${editor.isActive("italic") ? style.active : ""}`}> 
           <ImParagraphCenter />
        </button>

        <button name='right' onClick={handleAlign} className={`${style.button} ${editor.isActive("italic") ? style.active : ""}`}>
            <ImParagraphRight />
        </button>
         </div>
      </div>
    </div>
  );
}