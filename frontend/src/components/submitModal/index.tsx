/** @format */

import { useCallback, useEffect, useState } from "react";
import { IPost } from "../../api/types";
import Modal from "../modal";
import style from "./style.module.css";
import { IoMdCloudDownload } from "react-icons/io";
import { serverAxios } from "../../api/axios";
import { GroupBase } from "react-select";
import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";
interface ISubmitModal {
  post: IPost;
  isOpen: boolean;
  handleClose: () => void;
}

// Custom styles for react-select component
const customStyles: StylesConfig<unknown, true, GroupBase<unknown>> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#161616", // Set the background color of the control
    borderColor: state.isFocused ? "#333" : "#161616", // Adjust the border color based on focus state
    boxShadow: state.isFocused ? undefined : undefined, // Remove the box-shadow
    outline: "none", // Remove the outline
  }),
  input: (base) => ({
    ...base,
    color: "#cecdcd", // Set the text color to white
    outline: "none", // Remove the outline
    // Set the background color
  }),
  singleValue: (base) => ({
    ...base,
    color: "#cecdcd", // Set the text color for a single selected value
  }),
  placeholder: (base) => ({
    ...base,
    color: "#cecdcd", // Set the text color for the placeholder
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#161616", // Set the background color of the dropdown menu
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#333" : "#161616", // Change background color on hover
    color: "#cecdcd", // Set the text color
    "&:active": {
      backgroundColor: "#444", // Change background color when an option is selected
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#333", // Set the background color for multi-value selected tags
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#cecdcd", // Set the text color for multi-value labels
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#cecdcd", // Set the color for the remove icon
    "&:hover": {
      // backgroundColor:"#444", Change background color on hover for the remove icon
      color: "#cecdcd",
    },
  }),
};

export default function SubmitModal({ post, isOpen, handleClose }: ISubmitModal) {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState([
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]);

  /*useEffect(() => {
    setIsCreateButtonEnabled(title.trim().length > 0);
  }, []);*/

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
    const newOption = { value: inputValue, label: inputValue };
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    // Validate form data
    //  const result = postSchema.safeParse({ title, subtitle });

    /*if (!result.success) {
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
    } catch (error) {
      console.error("Post submission error:", error);
      setLoading(false);
    }*/
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
            {filePreview && (
              <img
                src={filePreview}
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
              />
            </div>

            <div className={style.input_wrapper}>
              {/*<span className={style.label}>Subtitle</span> */}
              <input
                className={`${style.input} ${style.subtitle_input} `}
                placeholder="Subtitle"
              />
            </div>

            <CreatableSelect
              options={options}
              isMulti
              placeholder="tags"
              styles={customStyles}
              onCreateOption={handleCreate}
            />
          </div>

          <button
            type="submit"
            className={`${style.create_btn} ${
              isCreateButtonEnabled ? style.create_btn_active : ""
            } `}
          >
            Create {loading && "..."}
          </button>

          {errors.length > 0
            ? errors.map((error) => <p className={style.error_display}>{error}</p>)
            : ""}
        </form>
      </div>
    </Modal>
  );
}
