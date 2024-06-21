/** @format */

import { Editor } from "@tiptap/react";
import style from "./style.module.css";
import { useState } from "react";
import Dropdown from "../../components/dropdown";

interface ToolBarProps {
  editor: Editor;
}
const list: any = [
  { type: "PARAGRAPH", label: "Paragraph", value: "" },
  { type: "HEADING", depth: 1, label: "Heading 1" },
  { type: "HEADING", depth: 1, label: "Heading 1" },
  { type: "HEADING", depth: 2, label: "Heading 2" },
  { type: "HEADING", depth: 3, label: "Heading 3" },
];
export default function Toolbar({ editor }: ToolBarProps) {
  const handleAlign = (e: React.MouseEvent<HTMLButtonElement>) => {
    editor.commands.setTextAlign(e.currentTarget.name);
    editor.chain().focus().run();
  };

  return (
    <div className={style.toolbar}>
      <div className={`${style.section}`}>
        <button className={`${style.button}`}>
          <i className="bx bx-undo"></i>
        </button>
        <button className={`${style.button}`}>
          <i className="bx bx-redo"></i>
        </button>
      </div>
      <div className={`${style.section} ${style.format_section}`}>
        <button className={`${style.button}`}>
          <i className={`bx bx-bold ${style.icon}`}></i>
        </button>

        <button className={`${style.button}`}>
          <i className="bx bx-italic"></i>
        </button>
      </div>
      <div className={`${style.section} ${style.format_textStyles_section}`}>
        <Dropdown
          defaultValue={{ type: "PARAGRAPH", label: "Paragarph", value: "paragraph" }}
          type="heading/Normal"
          options={list}
        />

        <Dropdown
          defaultValue={{ type: "FONTSIZE", label: 5, value: 5 }}
          type="FontSize"
          options={[
            { type: "FONTSIZE", label: 10, value: 5 },
            { type: "FONTSIZE", label: 16, value: 16 },
          ]}
          width={"70px"}
        />
      </div>

      <div className={`${style.section} ${style.format_align_section}`}>
        <button className={`${style.button}`}>
          <i className="bx bx-align-left"></i>
        </button>
        <button className={`${style.button}`}>
          <i className="bx bx-align-middle"></i>
        </button>
        <button className={`${style.button}`}>
          <i className="bx bx-align-right"></i>
        </button>

        <button className={`${style.button}`}>
          <i className="bx bx-align-justify"></i>
        </button>
      </div>

      <div className={`${style.section} `}>
        <button className={`${style.button}`}>
          <i className="bx bx-list-ul"></i>
        </button>
        <button className={`${style.button}`}>
          <i className="bx bx-list-ol"></i>
        </button>
        <button className={`${style.button}`}>
          <i className="bx bx-code-block"></i>
        </button>
      </div>
    </div>
  );
}
