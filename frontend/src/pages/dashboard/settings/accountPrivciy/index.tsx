/** @format */

import React from "react";
import style from "./style.module.css";

export default function PrivacySettings() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Privacy Settings</h2>
        <p className={style.section_description}>Update your privacy preferences below</p>
      </div>

      <form className={style.form}>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <label>Profile Visibility</label>
            <select className={style.input}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <p className={style.description}>Control who can see your profile</p>
          </div>

          <div className={style.input_wrapper}>
            <label>Search Engine Indexing</label>
            <input className={style.input} type="checkbox" />
            <p className={style.description}>
              Allow search engines to index your profile
            </p>
          </div>

          <div className={style.input_wrapper}>
            <label>Two-Factor Authentication</label>
            <input className={style.input} type="checkbox" />
            <p className={style.description}>
              Enable two-factor authentication for added security
            </p>
          </div>

          <div className={style.input_wrapper}>
            <label>Data Sharing</label>
            <input className={style.input} type="checkbox" />
            <p className={style.description}>
              Allow sharing of your data with third-party services
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
