/** @format */

// reusable code
import React from "react";
// import ReactDOM from "react-dom";
import styles from "./styles.module.css";

interface ModalProps {
  modalKey: string;
  isOpen: boolean;

  contentClassName?: string;
  overlayClassName?: string;
  handleClose: () => any;
  onClickOff?: () => {};
  children: any;
  showCloseBtn?: boolean;
}
export default function Modal(props: ModalProps) {
  if (props.isOpen === false) return null;
  
  return (
    <div
      className={`${styles["modal-overlay"]} ${props.overlayClassName}`}
      onClick={props.onClickOff}
    >
      <div
        className={`${styles["modal-content"]} ${props.contentClassName}`}
        data-modal-key={props.modalKey}
      >
        {props.children}
        {props.showCloseBtn && (
          <button
            className={styles["modal-close-btn"]}
            onClick={() => {
              props.handleClose();
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
