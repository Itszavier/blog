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
      handleClose={props.onClose}
    >
      <div>
        <div className={`${style.header}`}>
          <h2>Finalize Your Article and Get It Ready for Publication</h2>
          <p>
            Make sure your article has a good hero image and a title that matches your
            content.
          </p>
        </div>
        <div className="divider-h"></div>

        <input type="file" />

        <div className="divider-h"> </div>
        <div>
          <form>
            <div className={style.cover_image}></div>
            <div className={"form-group"}>
              <label>Title</label>
              <input disabled={showTitleInput} value={title} className={style.input} />
            </div>
            <div className={"form-group"}>
              <label>Subtitle</label>
              <input value={subtitle} className={style.input} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className={style.text_area} />
            </div>

            <div className="form-group">
              <label>Tags</label>
              <TagInput tags={tags} />
            </div>

            <div className={style.btn_container}>
              <button className={`.btn btn-secondary ${style.button}`}>close</button>
              <button className={`.btn btn-primary  ${style.button}`}>
                Publish & View
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
