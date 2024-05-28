/** @format */

import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useAuth } from "../../../context/auth";
import { serverAxios } from "../../../api/axios";
const defualtUrl =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

export default function ProfileTab() {
  const { user } = useAuth();

  const [username, setUsername] = useState<string>(user?.username || "");
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [ImagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();




    serverAxios.post("/user/update/profile");
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.form_body}>
        <div className={style.input_group}>
          <span className={style.input_label}>name:</span>
          <span className={style.input_description}>Update your full name.</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={style.input}
            type="text"
            placeholder="full name"
          />
        </div>

        <div className={style.input_group}>
          <span className={style.input_label}>username:</span>
          <span className={style.input_description}>Change your username (unique).</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={style.input}
            type="text"
            placeholder="username"
          />
        </div>

        <div className={style.input_group}>
          <span className={style.input_label}>bio:</span>
          <span className={style.input_description}>
            Edit your bio (max 150 characters).
          </span>
          <input
            className={`${style.input} ${style.bio_input}`}
            type="text"
            placeholder="Bio"
            max={240}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className={style.input_group}>
          <span className={style.input_label}>Profile Image:</span>
          <div className={style.profile_image_container}>
            {ImagePreview ? (
              <img src={ImagePreview} className={style.profile_image_preview}></img>
            ) : (
              <img src={defualtUrl} className={style.profile_image_preview}></img>
            )}
            <input
              accept={"image/*"}
              type="file"
              className={style.profile_image_input}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
      <div className={style.form_footer}>
        <button type="submit">Save changes</button>
      </div>
    </form>
  );
}
