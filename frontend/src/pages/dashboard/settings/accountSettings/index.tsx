/** @format */
import UsernameInput from "../../usernameInput";
import SocialInput from "../../socialsInput";
import style from "./style.module.css";

export default function AccountSettings() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Account Settings</h2>
        <p className={style.section_description}>
          Update your account information below
        </p>
      </div>

      <form className={style.form}>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <label>name</label>
            <input className={style.input} type="text" placeholder="name" />
            <p className={style.description}>Enter your full name</p>
          </div>

          <div className={style.input_wrapper}>
            <label>username</label>
            <input className={style.input} placeholder="username" type="text" />
            <p className={style.description}>Choose a unique username</p>
          </div>

          <div className={`${style.input_wrapper} ${style.bio_wrapper}`}>
            <label>bio</label>
            <textarea className={style.input} placeholder="start writing your bio" />
            <p className={style.description}>Write a short description about yourself</p>
          </div>
        </div>

        <div className={`${style.input_group} ${style.profile_container}`}>
          <div className={`${style.input_wrapper} `}>
            <div className={style.profile_image_container}>
              <img src="" alt="Profile" />
              <input className={style.file_input} type="file" />
            </div>
          </div>
          <SocialInput
            socialList={[
              "https://www.tiktok.com/@your_profile",
              "https://www.tiktok.com/@your_profile",
              "https://www.tiktok.com/@your_profile",
            ]}
          />
        </div>

        
      </form>
    </div>
  );
}
