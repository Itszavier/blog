/** @format */

import { z } from "zod";
import Footer from "../../components/footer";
import style from "./style.module.css";
import { useState } from "react";
import { IoAlert } from "react-icons/io5";
import { GoAlert } from "react-icons/go";
import { serverAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../api/types";
import { ButtonLoader } from "../../components/loading";

const titleSchema = z
  .string()
  .min(5, { message: "Title must be at least 5 characters long." })
  .max(100, { message: "Title must be at most 100 characters long." });

export default function Create() {
  const [title, setTitle] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    isFormValid(e.target.value);
  };

  const isFormValid = (value: string): boolean => {
    const { success, error } = titleSchema.safeParse(value);

    if (!success) {
      setValidationErrors(error.errors[0]?.message || "Invalid title");
      return false;
    }

    setValidationErrors("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length <= 0) {
      return;
    }
    if (!isFormValid(title)) {
      return;
    }
    setLoading(true);

    try {
      const response = await serverAxios.post("/posts/create", { title });
      const post: IPost = response.data.post;
      console.log(post);
      navigate(`/editor/${post._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container}>
        <form className={style.createForm} onSubmit={handleSubmit}>
          <div className={style.group}>
            <div className={style.text_container}>
              <h3 className={style.title}>Pick an Engaging Title for Your New Article</h3>
              <p className={style.text}>
                Make sure your title is catchy and accurately reflects the content of your
                article.
              </p>
            </div>
            <div>
              <input
                value={title}
                onChange={handleChange}
                className={style.input}
                type="text"
                placeholder="Title..."
              />
              {validationErrors && (
                <div className={style.error}>
                  <GoAlert />
                  {validationErrors}
                </div>
              )}
            </div>
            <div className={style.button_container}>
              <button className={style.button} type="submit">
                continue {loading && <ButtonLoader />}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

