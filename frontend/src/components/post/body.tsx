/** @format */

import { Link } from "react-router-dom";
import { IPost } from "../../api/types";
import style from "./style.module.css";
import { encodeTitle } from "../../utils";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { Box, Text, Image } from "@chakra-ui/react";
interface CardBodyProps {
  post: IPost;
}
export default function CardBody({ post }: CardBodyProps) {
  const encodedUrl = `/article/${encodeTitle(post.title)}/${post.handle}`;

  return (
    <Box className={style.post_card_body}>
      <Box className={style.post_data_wrapper}>
        <Text className={style.title}>{post.title}</Text>

        <Text className={`${style.sub_title} text-s `}>
          {post.subtitle || "subtitle from content"}
        </Text>
      </Box>

      {post.heroImage?.url && (
        <Image
          className={style.heroImage}
          src={post.heroImage?.url}
          alt=" "
          width={120}
          height={90}
        />
      )}
    </Box>
  );
}
