/** @format */

import style from "./style.module.css";

export default function Settings() {
  return (
    <div className={style.container}>
      <div className={style.settings_tab}>tabs</div>
      <form className={style.profile_settings_form}>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <span className={style.label_text}>full name</span>
            <input
              className={style.input}
              type="text"
              defaultValue={"Ash Lord"}
            />
          </div>

          <div className={style.input_wrapper}>
            <span className={style.label_text}>Bio</span>
            <input
              className={style.input}
              type="text"
              defaultValue={"I am a avid writer"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
