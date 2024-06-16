/** @format */

import style from "./style.module.css";

export default function Create() {
  return (
    <div className={style.container}>
      <div className={style.container}>
        <form className={style.createForm}>
          <div className={style.group}>
            <div className={style.text_container}>
              <h3 className={style.title}>Pick an Engaging Title for Your New Article</h3>
              <p className={style.text}>
                Make sure your title is catchy and accurately reflects the content of your
                article.
              </p>
            </div>
            <div>
              <input className={style.input} type="text" placeholder="Title..." />
            </div>
            <div className={style.button_container}>
              <button className={style.button} type="submit">
                continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
