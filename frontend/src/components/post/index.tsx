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
  showMenu?: boolean;
}

export default function PostCard({
  post,
  width,
  height,
  statusText,
  showMenu,
}: PostProps) {
  const DisplayStatusText = () => {
    if (!statusText) return null;

    if (post.published) {
      return <span className={style.status_text}>Published</span>;
    } else {
      return <span className={style.status_text}>Draft</span>;
    }
  };

  return (
    <div
      style={{
        width: width ? width : "70%",
        minHeight: height ? height : "260px",
      }}
      className={`${style.post_card}`}
    >
      <div className={style.post_card_header}>
        <img
          className={style.profile_image}
          src={post.author.profileImage.url}
          width={20}
          height={20}
        />

        <span>
          <Link className={style.link} to={`/profile/${post.author.username}`}>
            {post.author.name}
          </Link>
        </span>
        {statusText && <BsDot />}
        <DisplayStatusText />

        {showMenu && <PostMenuDropdown post={post} />}
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
