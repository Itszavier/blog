/** @format */

import { Editor } from "@tiptap/react";
import style from "./style.module.css";
import Dropdown, { Option } from "../dropdown";
import { FaBold, FaItalic } from "react-icons/fa";
import { ImParagraphRight } from "react-icons/im";
import { ImParagraphLeft } from "react-icons/im";
import { ImParagraphCenter } from "react-icons/im";
import {FaRedo, FaUndo}from "react-icons/fa";

interface IToolbarProps {
  editor: Editor;
}

const TextTypeOptions: Option[] = [
  {
    name: "Paragraph",
    value: "paragraph",
    type: "paragraph",
  },

  {
    name: "Heading 1",
    value: 1,
    type: "heading",
  },

  {
    name: "Heading 2",
    value: 2,
    type: "heading",
  },

  {
    name: "Heading 3",
    value: 3,
    type: "heading",
  }
]

export default function Toolbar({ editor }: IToolbarProps) {

  const handleAlign = (e: React.MouseEvent<HTMLButtonElement> ) => {
    editor.commands.setTextAlign(e.currentTarget.name)
    editor.chain().focus().run();
  }


  const handleDropdownChange = (option: Option) =>{
    if(option.type === "paragraph") {
      return editor.chain().focus().setParagraph().run();
    }

    if(option.type === "fontFamily") return;

    
    if(option.type === "heading") {
      return  editor.commands.setHeading({level: option.value as any});
    }
     
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

       <Dropdown selectedValue="Paragraph" options={TextTypeOptions} onChange={handleDropdownChange}/>
        
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
