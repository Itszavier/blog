import style from "./style.module.css";

export default function Signup() {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <div className={style.header}>create a new account</div>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <span className={`material-icons  ${style.icon}`}>mail</span>
            <input
              className={style.input}
              type="email"
              required
              placeholder="Email"
            />
          </div>

          <div className={style.input_wrapper}>
            <span className={`material-icons ${style.icon}`}>lock</span>
            <input
              className={style.input}
              type="email"
              required
              placeholder="Password"
            />
          </div>
        </div>
        <div className={style.error_message}>error message</div>
        <button className={style.signup_btn}>Sign up</button>
      </form>
    </div>
  );
}
