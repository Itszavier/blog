import style from "./style.module.css";
import googleIcon from "../../assets/google.png";
import { useModal } from "../../context/modalContext";
import Modal from "../modal";

export default function AuthModal() {
  const {} = useModal();

  const handleClose = () => {};

  const handleLogin = () => {
    setAuthModal(false);
    window.open("http://localhost:8080/auth/login/google", "_self");
  };

  return (
    <Modal modalKey="auth">
      <div className={style.content}>
        <div className={style.header}>Sign in</div>
        <div onClick={handleLogin} className={style.button_container}>
          <button className={style.google_signin_btn}>
            <img className={style.google_icon} src={googleIcon} />
            Sign in with google
          </button>
        </div>
      </div>
    </Modal>
  );
}
