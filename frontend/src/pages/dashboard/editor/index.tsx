/** @format */
import { EditorContent, useEditor } from "@tiptap/react";
import style from "./style.module.css";
import Toolbar from "../../../components/EditorToolbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileDropdown from "../../../components/profileDropdown";
import { Loading } from "../../../components/loading";
import "./prosemirror.css";
import useFetch from "../../../hooks/useFetch";
import { extenions } from "../../../tipTap.config";
import { IPost } from "../../../api/types";
import useAutoSave from "../../../hooks/useAutoSave";

interface IPostInitailData {
  title: string;
  subtitle: string;
  content: {
    html: string;
    text: string;
  };
}

async function handleAutoSave(unSavedData: IPostInitailData) {
  console.log("save", unSavedData);
}

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Use state with an initial function
  const [post, setPost] = useState<IPostInitailData>(() => ({
    title: "",
    subtitle: "",
    content: {
      html: "",
      text: "",
    },
  }));

  // Use the fetch hook
  const { isPending } = useFetch<IPost>(`/posts/fetch/editable/${id}`, {
    key: "post",
    onfetch: (data) => {
      console.log("saved handle save function", data);
      setPost({ title: data.title, subtitle: data.subtitle, content: data.content });
    },
  });

  const { isSaving } = useAutoSave<IPostInitailData>(post, {
    onSave: handleAutoSave,
    debounceDelay: 600,
  });

  const editor = useEditor({
    extensions: extenions,
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
    if (!isPending) {
      editor?.commands.setContent(post.content.html, false);
    }
  }, [isPending]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
  };

  if (isPending) return <Loading />;

  if (!editor) return null;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.control}>
          <button className={style.back_btn} onClick={() => navigate(-1)}>
          </button>
          <div className={style.left_container}>
            <span>{isSaving ? "saving" : `done`}</span>
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
