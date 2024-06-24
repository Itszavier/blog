/** @format */

import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import PostMenuDropdown from "../Postmenudropdown";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { IPost } from "../../api/types";
import { FaCommentAlt, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const title = encodeURIComponent(post.title);
  const handle = post.handle;
 

  return (
    <div
      onClick={() => {
        navigate(`/article/${title}/${handle}`);
      }}
      className={`${style.post_card}`}
    >
      <CardBody post={post} />
      <CardFooter post={post} />
    </div>
  );
}
