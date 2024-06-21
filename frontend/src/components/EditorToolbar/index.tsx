/** @format */

import { Editor } from "@tiptap/react";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown";
import { StringChain } from "lodash";

interface ToolBarProps {
  editor: Editor;
}
const list: any = [
  { type: "PARAGRAPH", label: "Paragraph", value: "paragraph" },
  { type: "HEADING", depth: 1, label: "Heading 1" },
  { type: "HEADING", depth: 2, label: "Heading 2" },
  { type: "HEADING", depth: 3, label: "Heading 3" },
];

export default function Toolbar({ editor }: ToolBarProps) {
  const handleCommand = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const command = e.currentTarget.name;
    switch (command) {
      case "redo":
        editor.chain().focus().redo().run();
        break;
      case "undo":
        editor.chain().focus().undo().run();
        break;
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        // TipTap does not support underline by default. You need to add an extension for it.
        // editor.chain().focus().toggleUnderline().run();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        break;
      default:
        break;
    }
  };

  const isActive = (
    command: "bold" | "italic" | "orderedList" | "bulletList" | "link"
  ) => {
    switch (command) {
      case "bold":
        return editor.isActive("bold");
      case "italic":
        return editor.isActive("italic");
      case "orderedList":
        return editor.isActive("orderedList");
      case "bulletList":
        return editor.isActive("bulletList");
      case "link":
        return editor.isActive("link");
      default:
        return false;
    }
  };

  return (
    <div className={`${style.toolbar} `}>
      <div className={`${style.section}`}>
        <button onClick={handleCommand} name="undo" className={`${style.button}`}>
          <i className="bx bx-undo"></i>
        </button>
        <button onClick={handleCommand} name="redo" className={`${style.button}`}>
          <i className="bx bx-redo"></i>
        </button>
      </div>
      <div className={`${style.section} ${style.format_section}`}>
        <button
          name="bold"
          onClick={handleCommand}
          className={`${style.button} ${isActive("bold") && style.active}`}
        >
          <i className={`bx bx-bold ${style.icon}`}></i>
        </button>

        <button
          name="italic"
          onClick={handleCommand}
          className={`${style.button} ${isActive("italic") && style.active}`}
        >
          <i className="bx bx-italic"></i>
        </button>
      </div>
      <div className={`${style.section} ${style.format_textStyles_section}`}>
        <Dropdown
          defaultValue={list[0]}
          type="heading/Normal"
          onSelect={(selected) => console.log(selected)}
          options={list}
        />

        <Dropdown
          defaultValue={{ type: "FONTSIZE", label: 5, value: 5 }}
          type="FontSize"
          onSelect={(selected) => console.log(selected)}
          options={[
            { type: "FONTSIZE", label: 10, value: 10 },
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
        <button
          name={"bulletList"}
          onClick={handleCommand}
          className={`${style.button} ${isActive("bulletList") && style.active}`}
        >
          <i className="bx bx-list-ul"></i>
        </button>
        <button
          name={"orderedList"}
          onClick={handleCommand}
          className={`${style.button} ${isActive("orderedList") && style.active}`}
        >
          <i className="bx bx-list-ol"></i>
        </button>
        <button className={`${style.button}`}>
          <i className="bx bx-code-block"></i>
        </button>
      </div>
    </div>
  );
}
