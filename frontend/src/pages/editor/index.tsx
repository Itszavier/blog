/** @format */
import { useEditor } from "@tiptap/react";
import TiptapEditor from "../../components/editor";
import style from "./style.module.css";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "../../components/EditorToolbar";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverAxios } from "../../api/axios";
import { IPost } from "../../api/types";
import ProfileDropdown from "../../components/profileDropdown";
import SubmitModal from "../../components/submitModal";
import { useModal } from "../../context/modalContext";
import { Loading } from "../../components/loading";
import useAutosave from "../../hooks/useAutoSave";
import moment from "moment";

const placeholder: string =
  "Start writing your article here. Use the toolbar above for formatting and paste your content if needed...";

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { closeModal, isOpen, openModal } = useModal("publish");
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
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

    onUpdate(updatedEditor) {
      if (
        contentRef.current &&
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      ) {
        contentRef.current.scrollIntoView();
      }

      const html = updatedEditor.editor.getHTML();
      const text = updatedEditor.editor.getText();

      setPost((prev) => {
        return {
          ...prev!,
          content: {
            html,
            text,
          },
        };
      });
    },
  });

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
        setError(error.response.data.message);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(post);

    return () => {
      abortController.abort();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
  };
  /*
  const handleSave = async (updatedPost: IPost) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const formData = new FormData();
        // Title is required so we will not save it if empty.
        if (updatedPost.title.length > 0) {
          formData.append("title", updatedPost.title);
        }

        formData.append("subtitle", updatedPost.subtitle);

        formData.append("tags", JSON.stringify(updatedPost.tags));

        formData.append("content", JSON.stringify(updatedPost.content));

        const response = await serverAxios.put(`/posts/save/${post?._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        resolve();
      } catch (error: any) {
        console.log("save error", error.response);
        reject(error);
      }
    });
  };

  const { isSaving, lastSaved } = useAutosave(post, {
    onSave: handleSave,
    debounceDelay: 4000,
  });
  */

  // Return early if editor is not available yet
  if (!editor) return null;

  if (loading) return <Loading />;

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

  if (!post)
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
        Failed to load post
      </div>
    );

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
              onClick={() => openModal()}
              className={`${style.control_btn} ${style.publish_btn}`}
            >
              Publish settings
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
          <TiptapEditor editor={editor} />
        </div>
      </div>

      <SubmitModal
        post={post}
        setPost={setPost}
        isOpen={isOpen}
        handleClose={() => {
          closeModal();
        }}
      />
    </div>
  );
}
