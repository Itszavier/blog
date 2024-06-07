import Modal from "../modal";
import { useModal } from "../../context/modalContext";
import style from "./style.module.css";

export default function CreatePostModal() {
  const { closeModal } = useModal("createPost");
  return (
    <Modal
      contentClassName={style.container}
      handleClose={() => closeModal}
      isOpen={true}
      modalKey="createPost"
    >
      <form className={style.form}>
        <div>
          <input className={style.input} />
        </div>
      </form>
    </Modal>
  );
}
