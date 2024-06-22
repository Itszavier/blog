/** @format */

import { Link } from "react-router-dom";
import { IPost } from "../../api/types";
import style from "./style.module.css";
import { FaCommentAlt, FaHeart } from "react-icons/fa";
import moment from "moment";

interface CardFooterProps {
  post: IPost;
}
export default function CardFooter({ post }: CardFooterProps) {
  const createdAt = moment(post.createdAt).format("MMM DD YYYY");
  const updatedAt = moment(post.updatedAt).fromNow();

  return (
    <div className={style.footer}>
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

        {/*showMenu && <PostMenuDropdown post={post} />*/}
      </div>
      <div className="divider-v"></div>
      <button className={style.card_footer_button}>
        <FaHeart /> <span>0</span>
      </button>

      <button className={style.card_footer_button}>
        <FaCommentAlt />
      </button>
      <div className="divider-v"></div>
      <div>
        <span className="text-s">Created {createdAt}</span>
      </div>
    </div>
  );
}
