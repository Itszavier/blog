/** @format */

import style from "./style.module.css";
import googleIcon from "../../assets/google.png";
import welcomeImage from "../../assets/welcome.jpg";
import Modal from "../modal";
import { useModal } from "../../context/modalContext";
import { FaGoogle } from "react-icons/fa";

export default function AuthModal() {
  const { isOpen, closeModal } = useModal("auth");

  const handleLogin = () => {
    window.open(`https://narrate-server.loca.lt/auth/login/google`, "_self");
  };

  return (
    <Modal
      contentClassName={style.container}
      handleClose={closeModal}
      isOpen={isOpen}
      modalKey="auth"
    >
      <div className={style.content}>
        <div className={style.header}>
          <h2>Narrate</h2>
        </div>
        <div onClick={handleLogin} className={style.button_container}>
          <button className={style.google_signin_btn}>
            <FaGoogle size={30} />
            Sign in with google
          </button>
        </div>
      </div>
    </Modal>
  );
}
