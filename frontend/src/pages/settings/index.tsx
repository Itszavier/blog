/** @format */

import style from "./style.module.css";
import { useState } from "react";
export default function Settings() {
  return (
    <section className={style.container}>
      <div className={style.settings_tab}>tabs</div>
      <form className={style.profile_settings_form}>
        <div className={style.header}>
          <h2 className={style.header_title}>Profile Settings</h2>
        </div>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <span className={style.label_text}>name</span>
            <p className={style.description_text}>
              This is the name displayed on your Narrate profile. It can be
              different from your username.
            </p>
            <input
              className={style.input}
              type="text"
              defaultValue={"Ash Lord"}
            />
          </div>

          <div className={style.input_wrapper}>
            <span className={style.label_text}>username</span>
            <p className={style.description_text}>
              Your Narrate Url: https:/narrate.com/member/yourusername
            </p>
            <input
              className={style.input}
              type="text"
              defaultValue={"AshLord20"}
            />
          </div>

          <div className={style.input_wrapper}>
            <span className={style.label_text}>Bio</span>
            <p className={style.description_text}>
              A short description about yourself that will be visible on your
              Narrate profile.
            </p>
            <input
              className={style.input}
              type="text"
              defaultValue={"I am a avid writer"}
            />
          </div>

          <div className={style.input_wrapper}>
            <ProfileImage defaultImageUrl="https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon" />
          </div>
        </div>

        <button className={style.save_button} type="submit">
          save
        </button>
      </form>
    </section>
  );
}

interface ProfileImageProps {
  defaultImageUrl?: string; // Optional prop for default image URL
}

const ProfileImage: React.FC<ProfileImageProps> = ({ defaultImageUrl }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file);
  };

  return (
    <div className={style.profileImageContainer}>
      <img
        src={
          selectedImage
            ? URL.createObjectURL(selectedImage)
            : defaultImageUrl || "default-profile-image.jpg"
        }
        alt="Profile Image"
        className={style.defaultProfileImage}
      />
      <label htmlFor="profile-image-upload" className={style.uploadLabel}>
        Upload Profile Image
      </label>
      <input
        type="file"
        id="profile-image-upload"
        accept="image/*"
        className={style.profileImageUpload}
        onChange={handleImageChange}
      />
    </div>
  );
};
