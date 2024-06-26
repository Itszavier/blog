/** @format */
import UsernameInput from "../../usernameInput";
import SocialInput from "../../socialsInput";
import style from "./style.module.css";
import { useAuth } from "../../../../context/auth";

export default function AccountSettings() {
  const auth = useAuth();
  return (
    <div className={style.container}>
      <form className={style.form}>
        <div className={style.input_group}>
          <div className={`form-group  ${style.input_wrapper} `}>
            <div className={style.profile_image_container}>
              <img src="" alt="Profile" />
              <input className={style.file_input} type="file" />
            </div>
          </div>{" "}
          <div className="flex row pad-10 ">
            <div className={`form-group ${style.input_wrapper}`}>
              <label>name</label>
              <input
                value={auth.user?.name}
                className={` ${style.input}`}
                type="text"
                placeholder="name"
              />
              <p className={style.description}>Enter your full name</p>
            </div>

            <div className={`form-group ${style.input_wrapper}`}>
              <label>username</label>
              <input className={` ${style.input}`} placeholder="username" type="text" />
              <p className={style.description}>Choose a unique username</p>
            </div>
          </div>
          <div className="flex row ">
            <div className="column">
              <div className={`form-group ${style.input_wrapper}`}>
                <label>occupation</label>
                <input
                  className={`  ${style.input}`}
                  placeholder="occupation"
                  type="text"
                />
                <p className={style.description}>
                  Please enter your job title or role to help us understand your
                  professional background.
                </p>
              </div>

              <div className={`form-group ${style.input_wrapper}`}>
                <label>gender</label>
                <input className={`${style.input}`} placeholder="Gender" type="text" />
                <p className={style.description}></p>
              </div>
            </div>

            <div>
              <div className={`form-group ${style.input_wrapper}`}>
                <label>bio</label>
                <textarea
                  value={auth.user?.bio}
                  className={`${style.input} ${style.bio_input}`}
                  placeholder="Start writing your bio"
                />
                <p className={style.description}>
                  Write a short description about yourself
                </p>
              </div>
            </div>
          </div>
          <div>
            <button className={`btn btn-primary ${style.save_btn}`}>Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
}
/* <SocialInput
            socialList={[
              "https://www.tiktok.com/@your_profile",
              "https://www.tiktok.com/@your_profile",
              "https://www.tiktok.com/@your_profile",
            ]}*/
