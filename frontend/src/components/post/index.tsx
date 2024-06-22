/** @format */

import { Link } from "react-router-dom";
import style from "./style.module.css";
import PostMenuDropdown from "../Postmenudropdown";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { IPost } from "../../api/types";
import { FaCommentAlt, FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import { decodeTitle, encodeTitle } from "../../utils";
import CardBody from "./body";
import CardFooter from "./footer";

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

  useEffect(() => {
    const title = encodeTitle(post.title);
    const decodedTitle = decodeTitle(title);
    console.log(title, decodedTitle);
  }, []);

  return (
    <div className={`card ${style.post_card}`}>
      <CardBody post={post} />
      <CardFooter post={post} />
    </div>
  );
}
