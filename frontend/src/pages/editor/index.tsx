/** @format */
import { EditorContent, useEditor } from "@tiptap/react";
import style from "./style.module.css";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "../../components/EditorToolbar";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { serverAxios } from "../../api/axios";
import { IPost } from "../../api/types";
import ProfileDropdown from "../../components/profileDropdown";
import SubmitModal from "../../components/submitModal";
import { useModal } from "../../context/modalContext";
import { Loading } from "../../components/loading";
import "./prosemirror.css";
const placeholder: string =
  "Start writing your article here. Use the toolbar above for formatting and paste your content if needed...";

interface IPostInitailData {
  title: string;
  subtitle: string;
  content: {
    html: string;
    text: string;
  };
}

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPostInitailData>({
    title: "",
    subtitle: "",
    content: {
      html: "",
      text: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    serverAxios
      .get(`/posts/fetch/editable/${id}`, {
        signal: abortController.signal,
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data.post);
      })
      .catch((error) => {
        setError(error.response);
        console.log("error log", error);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(post);

    return () => {
      abortController.abort();
    };
  }, []);

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

    onUpdate(updatedEditor) {
      const html = updatedEditor.editor.getHTML();

      setPost((prev) => {
        return {
          ...prev!,
          content: {
            text: prev.content.text,
            html,
          },
        };
      });
    },
    content: post.content.html,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(post!.content.html);
    }
  }, [post?.content.html, editor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
  };

  // Return early if editor is not available yet
  if (!editor) return null;

  if (loading) return <Loading />;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.control}>
          <button className={style.back_btn} onClick={() => navigate(-1)}>
            <span className={style.back_btn_text}>Narrate</span>
          </button>
          <div className={style.left_container}>
            <span>
              {/* {isSaving ? "saving" : `lasted saved ${moment(lastSaved).fromNow()}`}}*/}
            </span>
            <button
              onClick={(e) => navigate("/publish", { state: post })}
              className={`${style.control_btn} ${style.publish_btn}`}
            >
              Publish Article
            </button>

            <ProfileDropdown />
          </div>
        </div>
        <Toolbar editor={editor} />
      </div>
      <div className={style.content}>
        <div className={style.middle_content}>
          <div className={style.meta_container}>
            <div className={style.input_wrapper}>
              <input
                type="text"
                placeholder="Title"
                value={post.title}
                className={`${style.input} ${style.title_input}`}
                onChange={handleChange}
                name={"title"}
              />
            </div>
            <div className={style.input_wrapper}>
              <input
                placeholder="Subtitle"
                value={post.subtitle}
                onChange={handleChange}
                name="subtitle"
                className={`${style.input} ${style.subtitle_input}`}
              />
            </div>
          </div>
          <div className="editor_container">
            <EditorContent
              value={"fwdfdfasfa"}
              placeholder="this is the placholder"
              editor={editor}
              className={"tiptap-content"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
