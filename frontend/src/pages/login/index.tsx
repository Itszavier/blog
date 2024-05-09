import style from "./style.module.css";

export default function Login() {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <div className={style.header}>Welcome back</div>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <span className={`material-icons  ${style.icon}`}>mail</span>
            <input className={style.input} type="email" placeholder="Email" />
          </div>

          <div className={style.input_wrapper}>
            <span className={`material-icons  ${style.icon}`}>lock</span>
            <input
              className={style.input}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className={style.error_message}>error message</div>
        <button className={style.login_btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
