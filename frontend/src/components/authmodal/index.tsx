import style from "./style.module.css";
import googleIcon from "../../assets/google.png";
import { useModal } from "../../context/modalContext";

export default function AuthModal() {
  const { setAuthModal } = useModal();

  const handleClose = () => {
    setAuthModal(false);
  };

  return (
    <div className={style.container}>
      <div className={style.overlay} onClick={handleClose}></div>
      <div className={style.content}>
        <button
          className={`material-icons ${style.close_btn}`}
          onClick={handleClose}
        >
          close
        </button>
        <div className={style.header}>Sign in</div>
        <div className={style.button_container}>
          <button className={style.google_signin_btn}>
            <img className={style.google_icon} src={googleIcon} />
            Sign in with google
          </button>
        </div>
      </div>
    </div>
  );
}
