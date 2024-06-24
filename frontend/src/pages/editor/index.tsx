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
import PublishModal from "../../components/publishModal";
import { useModal } from "../../context/modalContext";

interface IPostInitailData {
  _id: string;
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
  const { closeModal, openModal, isOpen } = useModal("publish");
  // Use state with an initial function
  const [post, setPost] = useState<IPostInitailData>(() => ({
    _id: "",
    title: "Test title of a post",
    subtitle: "",
    content: {
      html: "",
    },
  }));

  const { isPending, data } = useFetch<IPost>(`/posts/editable/${postId}`, {
    key: "post",
    onfetch: (data) => {
      console.log("saved handle save function", data);
      setPost({
        _id: data._id,
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
      });
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
            html,
          },
        };
      });
    },
    content: post.content.html,
  });

  useEffect(() => {
    if (!isPending) {
      editor?.commands.setContent(post.content.html);
    }

    if (editor && editor?.getHTML().length > 0) {
      editor.commands.focus("end");
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
          <div className={style.right_container}>
            <button className={style.back_btn} onClick={() => navigate(-1)}>
              <i className="bx bx-arrow-back"></i>
            </button>
            <div className={style.title_wrapper}>
              <p className={style.page_title}>{post.title}</p>
            </div>
          </div>

          <div className={style.left_container}>
            <span className={style.saved_text}>{!isSaving && "Changes saved"}</span>
            {!data?.published && (
              <button
                onClick={() => openModal()}
                className={`primary ${style.control_btn} ${style.publish_btn}`}
              >
                Publish Article
              </button>
            )}
          </div>
        </div>
        <Toolbar editor={editor} />
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

      <PublishModal
        post={{
          ...post,
          heroImage: data?.heroImage?.url,
          tags: data!.tags,
          description: data?.description,
        }}
        open={isOpen}
        onClose={() => closeModal()}
      />
    </div>
  );
}
