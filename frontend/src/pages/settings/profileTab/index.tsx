/** @format */

//** @format */
import style from "./style.module.css";
import { IUser, useAuth } from "../../../context/auth";
import { serverAxios } from "../../../api/axios";
import { useEffect, useState, ChangeEvent, FormEvent, useCallback } from "react";
import SocialInput from "../socialsInput";
import { ButtonLoader } from "../../../components/loading";
import axios from "axios";

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

interface InitialData {
  username: string;
  name: string;
  bio: string;
}

const error_message =
  "Invalid URL format. Please enter a URL from Instagram, YouTube, or TikTok.";

export default function ProfileTab() {
  const auth = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [user, setUser] = useState<IUser>(() => auth.user!);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              placeholder="Name"
            />
            <span>
              {" "}
              This name may appear on your posts. You can turn it off in settings,
            </span>
          </div>

          <UserNameInput />
          <div className={style.input_wrapper}>
            <label>Bio</label>
            <textarea
              value={user.bio}
              className={`${style.input} ${style.bio_input}`}
              placeholder="bio"
            />
            <span>
              {" "}
              A short description about yourself. This bio may appear on your profile.
            </span>
          </div>

          <SocialInput />
        </div>

        <div className={style.file_upload_container}>
          <div className={style.preview_wrapper}>
            <img className={style.preview_image} src={defaultUrl} alt="" />
          </div>

          <input className={style.file_upload_input} type="file" />
        </div>
      </div>

      <div className={style.button_container}>
        <button type="submit" className={style.button}>
          Update profile
        </button>
      </div>
    </form>
  );
}
interface UserNameInputProps {
  username?: string;
  onChange?: (value: string) => void;
}

function UserNameInput(props: UserNameInputProps) {
  const [username, setUsername] = useState<string>(() => props.username || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAvailiable, setisAvailiable] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const { available } = await isUsernameAvailiable(username);
        setisAvailiable(available);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }, 600);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);

    if (props.onChange) props.onChange(e.target.value);
  };

  return (
    <div className={style.input_wrapper}>
      <label>Username</label>
      <div className={style.username_input_wrapper}>
        <input
          value={username}
          className={`${style.input} ${style.username_input}`}
          type="text"
          onChange={(e) => handleChange}
          placeholder="username"
        />
        {loading && <ButtonLoader size={18} />}
      </div>

      <span> This username will appear in the URL of your profile.</span>
    </div>
  );
}

async function isUsernameAvailiable(username: string) {
  return new Promise<{ available: boolean; message: string }>(async (resolve, reject) => {
    try {
      const response = await serverAxios.get(`/username/isAvailable/${username}`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
