/** @format */
import { useEditor } from "@tiptap/react";
import TiptapEditor from "../../components/editor";
import style from "./style.module.css";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "../../components/EditorToolbar";
import { IoMdArrowRoundBack, IoMdSettings } from "react-icons/io";
import { useEffect, useRef } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const placeholder: string =
  "Start writing your article here. Use the toolbar above for formatting and paste your content if needed...";

export default function EditorPage() {

  const contentRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
    ],
    autofocus: true,
  });

  useEffect(() => {
    // Ensure editor is available before setting up event listener
    if (editor) {
      const handleContentChange = () => {
        // Scroll to the bottom of the editor only if there's a scrollbar
        if (
          contentRef.current &&
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        ) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      };

      editor.on("update", handleContentChange);

      return () => {
        editor.off("update", handleContentChange);
      };
    }
  }, [editor]);

  // Return early if editor is not available yet
  if (!editor) return null;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.control}>
          <button className={style.back_btn}>
            <span>Narrate</span>
          </button>
          <div className={style.left_container}>
            <button className={`${style.control_btn} ${style.setting_btn}`}>
              <IoMdSettings />
            </button>
            <button className={style.control_btn}>Save</button>
            <button className={`${style.control_btn} ${style.publish_btn}`}>
              Publish
            </button>
          </div>
        </div>
        <Toolbar editor={editor} />
      </div>
      <div ref={contentRef} className={style.content}>
        <div className={style.middle_content}>
          <div className={style.meta_container}>
            <div className={style.input_wrapper}>
              <input
                type="text"
                placeholder="Title"
                className={`${style.input} ${style.title_input}`}
              />
            </div>
            <div className={style.input_wrapper}>
              <input
                placeholder="Subtitle"
                className={`${style.input} ${style.subtitle_input}`}
              />
            </div>
          </div>
          <TiptapEditor editor={editor} />
        </div>
      </div>
    </div>
  );
}
