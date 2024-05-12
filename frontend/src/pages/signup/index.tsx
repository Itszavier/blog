import style from "./style.module.css";
import googleIcon from "../../assets/google.png";

export default function Signup() {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <button className={style.google_signin_btn}>
          <img className={style.google_icon} src={googleIcon} />
          Sign in with google
        </button>
      </div>
    </div>
  );
}
