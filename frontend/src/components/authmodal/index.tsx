import style from "./style.module.css";
import googleIcon from "../../assets/google.png";

import Modal from "../modal";
import { useModal } from "../../context/modalContext";

export default function AuthModal() {
  const { isOpen, closeModal } = useModal("auth");

  const handleLogin = () => {
    window.open("http://localhost:8080/auth/login/google", "_self");
  };

  return (
    <Modal handleClose={closeModal} isOpen={isOpen} modalKey="auth">
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
