/** @format */

import Modal from "../modal";
import React, { useState, useEffect } from "react";
import { useModal } from "../../context/modalContext";
import style from "./style.module.css";
import { IoMdCloudDownload } from "react-icons/io";
import z from "zod";
import { serverAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const postSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(50, "Title must not exceed 50 characters"),
  subtitle: z.string().max(100, "Subtitle must not exceed 100 characters"),
});

export default function CreatePostModal() {
  const { isOpen, closeModal } = useModal("createPost");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsCreateButtonEnabled(title.trim().length > 0);
  }, [title]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    // Validate form data
    const result = postSchema.safeParse({ title, subtitle });

    if (!result.success) {
      // Handle validation errors
      const formattedErrors: string[] = result.error.errors.map((error) => error.message);
      setErrors(formattedErrors);
      console.log(formattedErrors);
      return;
    }

    // Clear previous errors
    setErrors([]);

    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);

    if (file) {
      formData.append("heroImage", file);
    }

    try {
      const response = await serverAxios.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log("Post submission success:", response.data);
      navigate(`/editor/${response.data.post._id}`);
      closeModal();
    } catch (error) {
      console.error("Post submission error:", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      contentClassName={style.container}
      handleClose={() => closeModal()}
      isOpen={isOpen}
      modalKey="createPost"
    >
      <form className={style.form} onSubmit={handleSubmit}>
        {errors.length > 0
          ? errors.map((error) => <p className={style.error_display}>{error}</p>)
          : ""}
        <div className={style.image_upload_container}>
          {filePreview && (
            <img src={filePreview} alt="Image Preview" className={style.image_preview} />
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
        {!filePreview && <hr className={style.divider}></hr>}
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            {/*<span className={style.label}>Title/topic</span> */}
            <input
              className={`${style.input} ${style.title_input}`}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className={style.input_wrapper}>
            {/*<span className={style.label}>Subtitle</span> */}
            <input
              className={`${style.input} ${style.subtitle_input} `}
              placeholder="Subtitle"
              onChange={(e) => setSubtitle(e.target.value)}
              value={subtitle}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`${style.create_btn} ${
            isCreateButtonEnabled ? style.create_btn_active : ""
          } `}
        >
          Create {loading && "..."}
        </button>
      </form>
    </Modal>
  );
}
