/** @format */

import Modal from "../modal";
import { useModal } from "../../context/modalContext";
import style from "./style.module.css";
import { IoMdCloudDownload } from "react-icons/io";

export default function CreatePostModal() {
  const { isOpen, closeModal } = useModal("createPost");
  return (
    <Modal
      contentClassName={style.container}
      handleClose={() => closeModal}
      isOpen={isOpen}
      modalKey="createPost"
    >
      <form className={style.form}>
        <div className={style.image_upload_container}>
          <div className={style.file_intruction_container}>
            <IoMdCloudDownload className={style.icon} />
            <p>
              <strong>Choose a file</strong> or drag it here
            </p>
          </div>
          <input accept="image/*" className={style.image_upload} type="file" />
        </div>
        <hr className={style.divider}></hr>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            {/*<span className={style.label}>Title/topic</span> */}
            <input
              className={`${style.input} ${style.title_input}`}
              placeholder="Title"
            />
          </div>

          <div className={style.input_wrapper}>
            {/*<span className={style.label}>Subtitle</span> */}
            <input
              className={`${style.input} ${style.subtitle_input} `}
              placeholder="Subtitle"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
