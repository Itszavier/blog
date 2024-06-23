/** @format */

import { useState } from "react";
import Modal from "../modal";
import style from "./style.module.css";
import TagInput from "../tagInput";
import { useModal } from "../../context/modalContext";
import { toast, ToastContainer } from "react-toastify";
import { ToastConfig } from "../../utils";
import z from "zod";
import { isAxiosError } from "axios";
import { serverAxios } from "../../api/axios";
import { ButtonLoader } from "../loading";
interface IPostData {
  _id: string;
  title: string;
  subtitle: string;
  content: {
    html: string;
  };
  description?: string;
  tags: string[];
  heroImage?: string;
}

interface PublishModalProps {
  open: boolean;
  onClose: () => any;
  post: IPostData;
}
export default function PublishModal(props: PublishModalProps) {
  const [tags, setTags] = useState<string[]>(() => props.post.tags || []);
  const [title, setTitle] = useState(() => props.post.title || "");
  const [file, setFile] = useState<File | null>(null);
  const [subtitle, setSubtitle] = useState(() => props.post.subtitle || "");
  const [description, setDescription] = useState(() => props.post.description || "");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [publishLoading, setPublishLoading] = useState(false);
  const { closeModal } = useModal("publish");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPublishLoading(true);
      const data = {
        title,
        subtitle,
        description,
        tags,
      };
      const formSchema = z.object({
        title: z
          .string()
          .min(5, { message: "Title must be at least 5 characters long" })
          .max(114, { message: "Title cannot be more than 114 characters" }),
        subtitle: z
          .string()
          .min(5, { message: "Subtitle must be at least 5 characters long" })
          .max(114, { message: "Subtitle cannot be more than 114 characters" }),
        description: z
          .string()
          .max(500, { message: "Description cannot be more than 500 characters" })
          .optional(),
        tags: z
          .array(z.string())
          .default([])
          .refine((tags) => tags.length <= 5, {
            message: "You can only upload up to 5 tags",
          }),
      });
      const safeData = formSchema.parse(data);

      const formData = new FormData();

      formData.append("title", safeData.title);
      formData.append("subtitle", safeData.subtitle);
      if (safeData.description) {
        formData.append("description", safeData.description);
      }

      formData.append("tags", JSON.stringify(safeData.tags));
      if (file) {
        formData.append("heroImage", file);
      }

      const response = await serverAxios.post(
        `/posts/publish/${props.post._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPublishLoading(false);
      toast.success(response.data.message, ToastConfig);
      console.log("publish", response.data);
    } catch (error: any) {
      setPublishLoading(false);
      if (isAxiosError(error)) {
        if (error.response?.data.message) {
          return toast.error(error.response.data.messages, ToastConfig);
        }
      }

      if (z.instanceof(error)) {
        // Handle Zod validation errors
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const path = err.path.join(".");
          validationErrors[path] = err.message;
        });
        setErrors(validationErrors);
        toast.error(
          "Vaildation error review article information for more details",
          ToastConfig
        );
      } else {
        toast.error(
          "Failed to publish Article. Please check your internet connection and try again.",
          ToastConfig
        );
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  const onTagAdd = (updatedTags: string[]) => {
    console.log(updatedTags);
    setTags(updatedTags);
    console.log(tags);
  };

  const onTagRemove = (updatedTags: string[]) => {
    console.log(updatedTags);
    setTags(updatedTags);
    console.log(tags);
  };

  return (
    <Modal
      contentClassName={style.container}
      isOpen={props.open}
      modalKey={"publish"}
      showCloseBtn={false}
      handleClose={props.onClose}
    >
      <div className={`card ${style.header}`}>
        <div>
          {" "}
          <h2>Publish</h2>
          <p className="text-s">
            Make sure your article has a good hero image and a title that matches your
            content.
          </p>
        </div>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={"form-group"}>
          <label>Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={style.input}
            maxLength={114}
          />
          {errors["title"] && <span className={style.error}>{errors["title"]}</span>}
          <div className={style.user_message_section}>
            <span className={style.required_text}>
              <i className="bx bx-info-circle"></i>required
            </span>
          </div>
        </div>
        <div className={"form-group"}>
          <label>Subtitle</label>
          <input
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
            className={style.input}
            maxLength={114}
          />
          {errors["subtitle"] && (
            <span className={style.error}>{errors["subtitle"]}</span>
          )}
          <div className={style.user_message_section}>
            <span className={style.required_text}>
              <i className="bx bx-info-circle"></i>required
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={style.text_area}
            maxLength={500}
          />
          {errors["description"] && (
            <span className={style.error}>{errors["description"]}</span>
          )}
        </div>
        <div className="form-group">
          <div className={style.cover_image_upload_container}>
            {/*<img src="" alt="" /> */}
            <div className={style.image_upload_text_wrapper}>
              <i className="bx bx-cloud-upload"></i>
              <span>Upload a compelling cover image for your article</span>
            </div>
            <input onChange={handleFileChange} className={style.file_input} type="file" />
          </div>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <TagInput maxWidth="100%" onAdd={onTagAdd} onRemove={onTagRemove} tags={tags} />
          {errors["tags"] && <span className={style.error}>{errors["tags"]}</span>}
        </div>
        <div className={style.btn_container}>
          <button
            onClick={() => closeModal()}
            className={`btn btn-secondary ${style.button}`}
            type={"button"}
          >
            Close
          </button>
          <button type="submit" className={`btn btn-primary  ${style.button}`}>
            Publish & View {publishLoading && <ButtonLoader />}
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-center" />
      {/* Same as */}
      <ToastContainer />
    </Modal>
  );
}
