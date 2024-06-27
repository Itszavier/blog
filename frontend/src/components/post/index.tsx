/** @format */

import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import PostMenuDropdown from "../Postmenudropdown";
import moment from "moment";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";
import { IPost } from "../../api/types";
import { FaCommentAlt, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { decodeTitle, encodeTitle } from "../../utils";

import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
  Image,
  Heading,
  Avatar,
  Flex,
  IconButton,
  CardFooter,
  Button,
} from "@chakra-ui/react";

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
    <Card
      onClick={() => {
        navigate(`/article/${title}/${handle}`);
      }}
      bg={"light.cardBackground"}
      color={"light.cardText"}
      width={"100%"}
      height={"320px"}
    >
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody display={"flex"}>
        <Flex flexDirection={"column"}>
          <Heading size={"xl"}>{post.title}</Heading>
          <Text color={"light.secondaryText"}>
            {post.subtitle || "subtitle from content"}
          </Text>
        </Flex>

        {post.heroImage?.url && (
          <Image
            className={style.heroImage}
            src={post.heroImage?.url}
            width={"200px"}
            height={"120px"}
          />
        )}
      </CardBody>

      <CardFooter>
        <Button color={"light.primaryText"}>
          <i className="bx bxs-heart"></i>
        </Button>
      </CardFooter>
    </Card>
  );
}
