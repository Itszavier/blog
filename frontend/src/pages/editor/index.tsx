/** @format */
import { useEditor } from "@tiptap/react";
import TiptapEditor from "../../components/editor";
import style from "./style.module.css";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "../../components/EditorToolbar";
import { IoMdSettings } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { serverAxios } from "../../api/axios";
import { IPost } from "../../api/types";
import { useAuth } from "../../context/auth";
import ProfileDropdown from "../../components/profileDropdown";
const placeholder: string =
  "Start writing your article here. Use the toolbar above for formatting and paste your content if needed...";

export default function EditorPage() {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const abortController = new AbortController();
    serverAxios
      .get(`/posts/fetch/editable/${id}`, {
        signal: abortController.signal,
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  // Return early if editor is not available yet
  if (!editor) return null;

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "red",
        }}
      >
        {error}
      </div>
    );
  }
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.control}>
          <button className={style.back_btn}>
            <span>Narrate</span>
          </button>
          <div className={style.left_container}>
            <button className={`${style.control_btn} ${style.save_btn}`}>Save</button>
            <button className={`${style.control_btn} ${style.publish_btn}`}>
              Publish
            </button>
            <ProfileDropdown />
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
