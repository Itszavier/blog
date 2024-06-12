/** @format */

import { useEffect, useState } from "react";
import { IPost } from "../../api/types";
import Modal from "../modal";
import style from "./style.module.css";
import { IoMdCloudDownload } from "react-icons/io";
import { serverAxios } from "../../api/axios";
import CreatableSelect from "react-select/creatable";
import selectStyles from "./select.style";
import z from "zod";
import { useModal } from "../../context/modalContext";
import { PiChecks } from "react-icons/pi";
interface ISubmitModal {
  post: IPost;
  setPost: React.Dispatch<React.SetStateAction<IPost | null>>;
  isOpen: boolean;
  handleClose: () => void;
}

interface Option {
  label: string;
  value: string;
}

export default function SubmitModal({
  post,
  setPost,
  isOpen,
  handleClose,
}: ISubmitModal) {
  const { closeModal } = useModal("publish");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  //const [message, setMessage] = useState<string | null>(null);

  const options: Option[] = [
    { value: "information", label: "infomation" },
    { value: "news", label: "news" },
  ];

  useEffect(() => {
    setIsCreateButtonEnabled(post.title.trim().length > 0);
  }, [post]);

  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);

      // Cleanup URL object
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setFilePreview(null);
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files;
      setFile(uploadedFile[0]);
    }
  };

  const handleCreate = (inputValue: string) => {
    const newOption: Option = { label: inputValue, value: inputValue };
    setSelectedOptions((prev) => [...prev, newOption]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = {
        title: post.title,
        subtitle: post.subtitle,
        tags: selectedOptions.map((tag) => {
          return tag.value;
        }),
      };

      const postSchema = z.object({
        title: z
          .string()
          .min(5, { message: "Title must be at least 5 characters long" })
          .max(100, { message: "Title cannot exceed 100 characters" }),
        subtitle: z
          .string()
          .min(2, { message: "Subtitle must be at least 5 characters long" })
          .max(150, { message: "Subtitle cannot exceed 150 characters" }),
        tags: z.array(z.string()).default([]),
      });

      const parseData = postSchema.safeParse(data);

      if (!parseData.success) {
        const errors = parseData.error.errors.map((error) => {
          return error.message;
        });

        setErrors(errors);
        return;
      }
      setErrors([]);
      const formData = new FormData();

      formData.append("title", parseData.data.title);
      formData.append("subtitle", parseData.data.subtitle);
      formData.append("tags", JSON.stringify(parseData.data.tags));
      if (file) {
        formData.append("heroImage", file);
      }

      const response = await serverAxios.post(`/posts/publish/${post._id}`, formData);
      console.log(response);

      closeModal();
    } catch (error: any) {
      console.log(error);
      setErrors((prev) => {
        const array = prev;
        array.push(error.response.data.message);
        return array;
      });
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const formData = new FormData();

      if (post.title.length > 0) {
        formData.append("title", post.title);
      }

      if (post.subtitle.length > 0) {
        formData.append("subtitle", post.subtitle);
      }

      if (post.tags.length > 0) {
        const array = selectedOptions.map((option) => {
          return option.value;
        });
        formData.append("tags", JSON.stringify(array));
      }

      if (post.content.html.length > 0) {
        const content = JSON.stringify(post.content);
        formData.append("content", content);
      }
      if (file) {
        formData.append("heroImage", file);
      }

      const response = await serverAxios.post(`/posts/save/${post._id}`, formData);
      console.log(response.data, "save");
      closeModal();
    } catch (error: any) {
      console.log(error);
      setErrors((prev) => {
        const array = prev;
        array.push(error.response.data.message);
        return array;
      });
    }
  };

  return (
    <Modal
      contentClassName={style.container}
      modalKey="publish"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className={style.content}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.image_upload_container}>
            {(filePreview || post.heroImage?.url) && (
              <img
                src={filePreview || post.heroImage?.url}
                alt="Image Preview"
                className={style.image_preview}
              />
            )}

            <div className={style.file_intruction_container}>
              <IoMdCloudDownload className={style.icon} />
              <p>
                <strong>Choose a file</strong> or drag it here
              </p>
            </div>
            <input
              onChange={handleFileChange}
              accept="image/*"
              className={style.image_upload}
              type="file"
            />
          </div>

          <div className={style.input_group}>
            <div className={style.input_wrapper}>
              {/*<span className={style.label}>Title/topic</span> */}
              <input
                className={`${style.input} ${style.title_input}`}
                placeholder="Title"
                name="title"
                value={post.title}
                onChange={handleChange}
              />
            </div>
            <div className={style.input_wrapper}>
              {/*<span className={style.label}>Subtitle</span> */}
              <input
                className={`${style.input} ${style.subtitle_input} `}
                placeholder="Subtitle"
                name={"subtitle"}
                value={post.subtitle}
                onChange={handleChange}
              />
            </div>
            <div className={style.input_wrapper}>
              <CreatableSelect
                options={options}
                isMulti
                placeholder="tags"
                styles={selectStyles}
                onCreateOption={handleCreate}
                onChange={(newValue) => {
                  setPost((prev: any) => {
                    return { ...prev, tags: newValue.map((tag: any) => tag.value) };
                  });

                  setSelectedOptions(newValue as Option[]);
                }}
                defaultValue={post.tags.map((value: string) => {
                  return { value: value, label: value } as Option;
                })}
              />
            </div>
            <div className={style.button_container}>
              {post.published && (
                <p className={style.published_text}>
                  <PiChecks className={style.publish_icon} /> Published
                </p>
              )}
              <button type="button" className={style.save_btn} onClick={handleSave}>
                save
              </button>

              {!post.published && (
                <button
                  type="submit"
                  className={`${style.create_btn} ${
                    isCreateButtonEnabled ? style.create_btn_active : ""
                  } `}
                >
                  Publish {loading && "..."}
                </button>
              )}
            </div>
          </div>

          {errors.length > 0
            ? errors.map((error) => <p className={style.error_display}>{error}</p>)
            : ""}
        </form>
      </div>
    </Modal>
  );
}
