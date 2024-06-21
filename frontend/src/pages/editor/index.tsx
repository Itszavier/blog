/** @format */
import { EditorContent, useEditor } from "@tiptap/react";
import style from "./style.module.css";
import Toolbar from "../../components/EditorToolbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileDropdown from "../../components/profileDropdown";
import { Loading } from "../../components/loading";
import "./prosemirror.css";
import useFetch from "../../hooks/useFetch";
import { extenions } from "../../tipTap.config";
import { IPost } from "../../api/types";
import useAutoSave from "../../hooks/useAutoSave";

interface IPostInitailData {
  title: string;
  subtitle: string;
  content: {
    html: string;
  };
}

async function handleAutoSave(unSavedData: IPostInitailData) {
  console.log("save", unSavedData);
}

export default function EditorPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  // Use state with an initial function
  const [post, setPost] = useState<IPostInitailData>(() => ({
    title: "Test title of a post",
    subtitle: "",
    content: {
      html: "",
    },
  }));

  // Use the fetch hook
  /*const { isPending } = useFetch<IPost>(`/posts/fetch/editable/${postId}`, {
    key: "post",
    onfetch: (data) => {
      console.log("saved handle save function", data);
      setPost({ title: data.title, subtitle: data.subtitle, content: data.content });
    },
  }); */

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
            html,
          },
        };
      });
    },
    content: post.content.html,
  });

  /*useEffect(() => {
    if (!isPending) {
      editor?.commands.setContent(post.content.html);
    }

    if (editor && editor?.getHTML().length > 0) {
      editor.commands.focus("end");
    }
  }, [isPending]);*/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
  };

  if (false) return <Loading />;

  //if (!editor) return null;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.control}>
          <div className={style.right_container}>
            <button className={style.back_btn} onClick={() => navigate(-1)}>
              <i className="bx bx-arrow-back"></i>
            </button>
            <div className={style.title_wrapper}>
              <p className={style.page_title}>{post.title}</p> 
            </div>
          </div>

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
        <Toolbar />
      </div>

      <div className={style.content}>
        <div className={style.middle_content}>
          <div className={style.meta_container}>
            <div className={style.input_wrapper}>
              <input
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
                type="text"
                className={`${style.input} ${style.subtitle_input}`}
              />
            </div>
          </div>
          <div className="editor_container">
            <EditorContent editor={editor} className={"tiptap-content"} />
          </div>
        </div>
      </div>
    </div>
  );
}
