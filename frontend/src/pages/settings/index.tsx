/** @format */

import { useState } from "react";
import style from "./style.module.css";

const defualtUrl =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

export default function Settings() {
  const [profileImageFile, setProfileFile] = useState<File | null>(null);
  const [ImagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.nav_header}>
        <button className={`${style.nav_btn} ${style.active_btn}`}>
          <span className={"material-icons"}>manage_accounts</span> Profile
        </button>
        <button className={style.nav_btn}>
          <span className={"material-icons"}>security</span> privicy
        </button>
        <button className={style.nav_btn}>
          <span className={"material-icons"}>card_membership</span> membership
        </button>
      </div>

      <div className={style.body}>
        <form className={style.form}>
          <div className={style.form_body}>
            <div className={style.input_group}>
              <span className={style.input_label}>name:</span>
              <span className={style.input_description}>Update your full name.</span>
              <input className={style.input} type="text" placeholder="full name" />
            </div>

            <div className={style.input_group}>
              <span className={style.input_label}>username:</span>
              <span className={style.input_description}>
                Change your username (unique).
              </span>
              <input className={style.input} type="text" placeholder="username" />
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
            <button>Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
