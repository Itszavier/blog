/** @format */

import { Editor } from "@tiptap/react";
import style from "./style.module.css";

interface IToolbarProps {
  editor: Editor;
}

export default function Toolbar({ editor }: IToolbarProps) {
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
        <Dropdown />
        <FontSizeDropdown />
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

type Menu =
  | { type: "PARAGRAPH"; value: string; label: string }
  | { type: "HEADING"; depth: number; label: string }
  | { type: "FONTSIZE"; label: string; value: string }
  | { type: "FONTFAMILY"; label: string; value: string };

function Dropdown() {
  const list: Menu[] = [
    { type: "PARAGRAPH", label: "Paragraph", value: "" },
    { type: "HEADING", depth: 1, label: "Heading 1" },
    { type: "HEADING", depth: 1, label: "Heading 1" },
    { type: "HEADING", depth: 2, label: "Heading 2" },
    { type: "HEADING", depth: 3, label: "Heading 3" },
  ];

  return (
    <div className={style.dropdown_container}>
      <div className={style.input_container}>
        <input className={style.dropdown_input} type="text" />
        <i className="bx bx-chevron-down"></i>
      </div>

      <div className={style.dropdown}>
        {list.map((value, index) => {
          return (
            <button key={index} className={style.dropdown_select_btn}>
              <span>{value.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const FontSizeDropdown = () => {
  return (
    <select title="Font Size">
      <option value="12px">12px</option>
      <option value="14px">14px</option>
      <option value="16px">16px</option>
      <option value="18px">18px</option>
      <option value="20px">20px</option>
      <option value="22px">20px</option>
    </select>
  );
};
