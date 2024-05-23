/** @format */

import style from "./style.module.css";

export default function Settings() {
  return (
    <div className={style.container}>
      <div className={style.nav_header}>
        <button className={style.nav_btn}>
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
              <input className={style.input} type="text" placeholder="full name" />
            </div>

            <div className={style.input_group}>
              <span className={style.input_label}>username:</span>
              <input className={style.input} type="text" placeholder="username" />
            </div>

            <div className={style.input_group}>
              <span className={style.input_label}>bio:</span>
              <input
                className={`${style.input} ${style.bio_input}`}
                type="text"
                placeholder="Bio"
              />
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
