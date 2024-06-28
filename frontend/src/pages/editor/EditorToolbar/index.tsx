/** @format */

import { Editor } from "@tiptap/react";
import style from "./style.module.css";

import Dropdown, { Menu } from "../../../components/dropdown";
import { fontFamilies } from "./variables";
import { useState, useCallback, useEffect } from "react";
import { Box } from "@chakra-ui/react";

interface ToolBarProps {
  editor: Editor;
}
const list: any = [
  { type: "PARAGRAPH", label: "Paragraph", value: "paragraph" },
  { type: "HEADING", depth: 1, label: "Heading 1" },
  { type: "HEADING", depth: 2, label: "Heading 2" },
  { type: "HEADING", depth: 3, label: "Heading 3" },
];

type ActiveEnum =
  | "bold"
  | "italic"
  | "orderedList"
  | "bulletList"
  | "link"
  | "alignLeft"
  | "alignRight"
  | "alignCenter"
  | "justify";

const CommandShortHand = {
  redo: "redo",
  undo: "undo",
  bold: "bold",
  italic: "italic",
  underline: "underline",
  orderedList: "orderedList",
  bulletList: "bulletList",
  alignLeft: "alignLeft",
  alignRight: "alignRight",
  alignCenter: "center",
  justify: "justify",
};

export default function Toolbar({ editor }: ToolBarProps) {
  const handleHeading = (selected: Menu) => {
    if (selected.type === "PARAGRAPH") {
      return editor.chain().focus().setParagraph().run();
    }
    if (selected.type !== "HEADING") return;

    editor
      .chain()
      .focus()
      .setHeading({ level: selected.depth as any })
      .run();
  };

  const handleFontFamily = (selected: Menu) => {
    if (selected.type !== "FONTFAMILY") return;
    if (editor.isActive({ fontFamily: selected.value })) {
      editor.chain().focus().unsetFontFamily().run();
    }
    editor.chain().focus().setFontFamily(selected.value).run();
  };

  const handleCommand = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const command = e.currentTarget.name;
    switch (command) {
      case CommandShortHand.redo:
        editor.chain().focus().redo().run();
        break;
      case CommandShortHand.undo:
        editor.chain().focus().undo().run();
        break;
      case CommandShortHand.bold:
        editor.chain().focus().toggleBold().run();
        break;
      case CommandShortHand.italic:
        editor.chain().focus().toggleItalic().run();
        break;
      case CommandShortHand.underline:
        // TipTap does not support underline by default. You need to add an extension for it.
        // editor.chain().focus().toggleUnderline().run();
        break;
      case CommandShortHand.orderedList:
        editor.chain().focus().toggleOrderedList().run();
        break;

      case CommandShortHand.bulletList:
        editor.chain().focus().toggleBulletList().run();
        break;
      case CommandShortHand.alignLeft:
        editor.chain().focus().setTextAlign("left").run();
        break;
      case CommandShortHand.alignRight:
        editor.chain().focus().setTextAlign("right").run();
        break;
      case CommandShortHand.justify:
        editor.chain().focus().setTextAlign("justify").run();
        break;
      case CommandShortHand.alignCenter:
        editor.chain().focus().setTextAlign("center").run();
        break;
      default:
        break;
    }
  };

  const isActive = (command: ActiveEnum) => {
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
      case "alignLeft":
        return editor.isActive({ textAlign: "left" });
      case "alignRight":
        return editor.isActive({ textAlign: "right" });
      case "alignCenter":
        return editor.isActive({ textAlign: "center" });
      case "justify":
        return editor.isActive({ textAlign: "justify" });
      default:
        return false;
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={8}
      bg={"light.cardBackground"}
      justifyItems={"center"}
      position={"sticky"}
      top={0}
      width={"100%"}
    >
      <div className={`${style.section}`}>
        <button
          onClick={handleCommand}
          name={CommandShortHand.undo}
          className={`${style.button}`}
        >
          <i className="bx bx-undo"></i>
        </button>
        <button
          onClick={handleCommand}
          name={CommandShortHand.redo}
          className={`${style.button}`}
        >
          <i className="bx bx-redo"></i>
        </button>
      </div>
      <div className={`${style.section} ${style.format_section}`}>
        <button
          name={CommandShortHand.bold}
          onClick={handleCommand}
          className={`${style.button} ${isActive("bold") && style.active}`}
        >
          <i className={`bx bx-bold ${style.icon}`}></i>
        </button>

        <button
          name={CommandShortHand.italic}
          onClick={handleCommand}
          className={`${style.button} ${isActive("italic") && style.active}`}
        >
          <i className="bx bx-italic"></i>
        </button>
      </div>
      <div className={`${style.section} ${style.format_textStyles_section}`}>
        <Dropdown
          defaultValue={fontFamilies[0]}
          type="heading/Normal"
          onSelect={handleHeading}
          options={list}
        />

        <Dropdown
          onSelect={handleFontFamily}
          defaultValue={fontFamilies[0]}
          options={fontFamilies}
          type="Font"
          width={"140px"}
        />
      </div>

      <div className={`${style.section} ${style.format_align_section}`}>
        <button
          name={CommandShortHand.alignLeft}
          onClick={handleCommand}
          className={`${style.button}`}
        >
          <i className="bx bx-align-left"></i>
        </button>
        <button
          name={CommandShortHand.alignCenter}
          onClick={handleCommand}
          className={`${style.button}`}
        >
          <i className="bx bx-align-middle"></i>
        </button>
        <button
          name={CommandShortHand.alignRight}
          onClick={handleCommand}
          className={`${style.button} `}
        >
          <i className="bx bx-align-right"></i>
        </button>

        <button
          name={CommandShortHand.justify}
          onClick={handleCommand}
          className={`${style.button} ${isActive("justify") && style.active}`}
        >
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
    </Box>
  );
}
