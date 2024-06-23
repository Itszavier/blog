/** @format */

import { useState } from "react";
import Modal from "../modal";
import style from "./style.module.css";
import TagInput from "../tagInput";

interface IPostData {
  _id: string;
  title: string;
  subtitle: string;
  content: {
    html: string;
  };
}

interface PublishModalProps {
  open: boolean;
  onClose: () => any;
  post: IPostData;
}
export default function PublishModal(props: PublishModalProps) {
  const [showTitleInput, setTitleInput] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [showSubtitleInput, setShowSubtitleInput] = useState(false);
  const [title, setTitle] = useState(() => props.post.title || "");
  const [subtitle, setSubtitle] = useState(() => props.post.subtitle || "");

  return (
    <Modal
      contentClassName={style.container}
      isOpen={props.open}
      modalKey={"publish"}
      showCloseBtn={false}
      handleClose={props.onClose}
    >
      <div className={style.wrapper}>
        <div className={`${style.header}`}>
          <h2>Get Your Article Ready for Publication</h2>
          <p>Customize your article metadata</p>
          <p>
            Make sure your article has a good hero image and a title that matches your
            content.
          </p>
        </div>

        <form>
          <div className={style.cover_image_upload_container}>
            {/*<img src="" alt="" /> */}
            <div className={style.image_upload_text_wrapper}>
              <i className="bx bx-cloud-upload"></i>
              <span>Upload a compelling cover image your article</span>
            </div>
            <input className={style.file_input} type="file" />
          </div>
          <div className={"form-group"}>
            <label>Title</label>
            <input disabled={showTitleInput} value={title} className={style.input} />
            <div className={style.user_message_section}>
              <span className={style.required_text}>
                <i className="bx bx-info-circle"></i>required
              </span>
              {/*<div className="divider-v h-15"></div> */}
            </div>
          </div>
          <div className={"form-group"}>
            <label>Subtitle</label>
            <input value={subtitle} className={style.input} />
            <div className={style.user_message_section}>
              <span className={style.required_text}>
                <i className="bx bx-info-circle"></i>required
              </span>
              {/*<div className="divider-v"></div> */}
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className={style.text_area} />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <TagInput tags={tags} />
          </div>{" "}
          <div className={style.btn_container}>
            <button className={`btn btn-secondary ${style.button}`}>Close</button>
            <button className={`btn btn-primary  ${style.button}`}>Publish & View</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
