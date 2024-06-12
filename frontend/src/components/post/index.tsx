/** @format */

import { Link } from "react-router-dom";
import style from "./style.module.css";
import PostMenuDropdown from "../Postmenudropdown";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { IPost } from "../../api/types";
import { FaCommentAlt, FaHeart } from "react-icons/fa";

interface PostProps {
  post: IPost;
  containerClassName?: string;
  statusText?: boolean;
  width?: string;
  height?: string;
}

export default function Post({ post, ...props }: PostProps) {
  const DisplayStatusText = () => {
    if (!props.statusText) return null;

    if (post.published) {
      return <span className={style.status_text}>Published</span>;
    } else {
      return <span className={style.status_text}>Draft</span>;
    }
  };

  return (
    <div
      style={{
        width: props.width ? props.width : "70%",
        minHeight: props.height ? props.height : "260px",
      }}
      className={`${style.post_card}`}
    >
      <div className={style.post_card_header}>
        <img
          className={style.profile_image}
          src={post.author.profileImage}
          width={20}
          height={20}
        />

        <span>
          <Link className={style.link} to={`/profile/${post.author._id}`}>
            {post.author.name}
          </Link>
        </span>
        {props.statusText && <BsDot />}
        <DisplayStatusText />

        <PostMenuDropdown post={post} />
      </div>
      <div className={style.post_card_body}>
        <div className={style.post_data_wrapper}>
          <p className={style.title}>
            <Link className={style.link} to={`/browse/${post._id}`}>
              {post.title}
            </Link>
          </p>
          <p className={style.sub_title}>{post.subtitle || "subtitle from content"}</p>
          <div className={style.profile_card_date}>
            <span>{moment(post.createdAt).format("MMM DD YYYY")}</span>
            {post.createdAt !== post.updatedAt && <BsDot />}
            {post.createdAt !== post.updatedAt && (
              <p>
                <span>Updated</span> {moment(post.updatedAt).fromNow()}
              </p>
            )}
          </div>
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
      <div className={style.footer}>
        <button className={style.card_footer_button}>
          <FaHeart /> <span>0</span>
        </button>

        <button className={style.card_footer_button}>
          <FaCommentAlt />
        </button>
      </div>
    </div>
  );
}
