// reusable code
import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import { useModal } from "../../context/modalContext";

interface ModalProps {
  modalKey: string;
  children: any;
}

const Modal: React.FC<ModalProps> = ({ modalKey, children }) => {
  const { isOpen, closeModal } = useModal(modalKey);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} data-modal-key={modalKey}>
        {children}
        <button className={styles["modal-close-btn"]} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
};

export default Modal;