/** @format */

//** @format */
import style from "./style.module.css";
import { IUser, useAuth } from "../../../context/auth";
import { serverAxios } from "../../../api/axios";
import React, { useEffect, useState, FormEvent, useRef, ChangeEvent } from "react";
import SocialInput from "../socialsInput";
import { ButtonLoader } from "../../../components/loading";
import UsernameInput from "../usernameInput";
import { z } from "zod";
import { VscMail } from "react-icons/vsc";
import { GoAlertFill } from "react-icons/go";

const defaultUrl =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

// Define types for form data and initial data
interface FormData {
  username: string;
  name: string;
  bio: string;
  profileImageFile: File | null;
  imagePreview: string | null;
}

export const ProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must only contain letters, numbers, and underscores"
    )
    .optional(),
  name: z.string().max(50, "Name must not exceed 50 characters").optional(),
  bio: z.string().max(160, "Bio must not exceed 160 characters").optional(),
});

export default function ProfileTab() {
  const auth = useAuth();
  const userRef = useRef<IUser | null>(null);
  const [IsUserDataChanged, setIsUserDataChanged] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(auth.user!);
  const [socials, setSocials] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [validationsErrors, setValidationErrors] = useState<{ [key: string]: string }>(
    {}
  );

  /// const [loading, setLoading] = useState<boolean>(false);
  ///const [error, setError] = useState<string | null>(null);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    userRef.current = auth.user;
    setIsUserDataChanged(!isEqual(userRef.current, user)); // Check if user data has changed
  }, [auth.user, user]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Access the selected file from the event

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    console.log(isFormValid());
  }, [user]);

  const handleSocialCreate = (createdValue: string) => {
    setSocials((prev) => [...prev, createdValue]);
  };

  const handleSocialRemove = (removedValue: string) => {
    setSocials((prev) => {
      return prev.filter((value) => {
        return value != removedValue;
      });
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedUser: any = { [e.target.name]: e.target.value };
    setUser((...prev) => ({ ...prev, ...updatedUser }));
  };

  const isFormValid = (): boolean => {
    const data = { username: user.username, bio: user.bio, name: user.name };
    const { success, error } = ProfileSchema.safeParse(data);

    if (!success) {
      const errors: { [key: string]: string } = {};

      error.errors.forEach((err) => {
        if (err.path) {
          errors[err.path[0]] = err.message;
        }
      });

      setValidationErrors(errors);

      return false;
    }

    setValidationErrors({});
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.header}>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <label>Name</label>
            <input
              value={user.name}
              className={style.input}
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Name"
            />
            <span>
              {validationsErrors.name && (
                <p className={style.error_message}>
                  {validationsErrors.name}
                  <GoAlertFill />
                </p>
              )}
              This name may appear on your posts. You can turn it off in settings,
            </span>
          </div>

          <UsernameInput
            username={user.username}
            error={validationsErrors.username}
            onChange={handleChange}
          />

          <div className={style.input_wrapper}>
            <label>Bio</label>
            <textarea
              value={user.bio}
              onChange={handleChange}
              className={`${style.input} ${style.bio_input}`}
              placeholder="bio"
            />

            {validationsErrors.bio && (
              <p className={style.error_message}>
                {validationsErrors.bio}
                <GoAlertFill />
              </p>
            )}

            <span>
              {" "}
              A short description about yourself. This bio may appear on your profile.
            </span>
          </div>

          <SocialInput
            onSocialCreate={handleSocialCreate}
            onSocialRemove={handleSocialRemove}
          />
        </div>

        <div className={style.file_upload_container}>
          <div className={style.preview_wrapper}>
            <img className={style.preview_image} src={defaultUrl} alt="" />
          </div>

          <input
            onChange={handleFileChange}
            className={style.file_upload_input}
            type="file"
          />
        </div>
      </div>

      <div className={style.button_container}>
        <button
          disabled={IsUserDataChanged}
          type="submit"
          className={`${style.button} ${IsUserDataChanged && style.btn_active}`}
        >
          Update profile
        </button>
      </div>
    </form>
  );
}

function isEqual(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
