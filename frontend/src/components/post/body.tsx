/** @format */

import { Link } from "react-router-dom";
import { IPost } from "../../api/types";
import style from "./style.module.css";
import { encodeTitle } from "../../utils";
import moment from "moment";
import { BsDot } from "react-icons/bs";
interface CardBodyProps {
  post: IPost;
}
export default function CardBody({ post }: CardBodyProps) {
  const encodedUrl = `/article/${encodeTitle(post.title)}/${post.handle}`;
  
  return (
    <div className={style.post_card_body}>
      <div className={style.post_data_wrapper}>
        <p className={style.title}>
            {post.title}
        </p>

        <p className={`${style.sub_title} text-s `}>{post.subtitle || "subtitle from content"}</p>
      </div>

      {post.heroImage?.url && (
        <img
          className={style.heroImage}
          src={post.heroImage?.url}
          alt=" "
          width={120}
          height={90}
        />
      )}
    </div>
  );
}
