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
  Flex,
  CardFooter,
  Button,
  Divider,
  Avatar,
  Stack,
  AspectRatio,
} from "@chakra-ui/react";
import { PiAvocadoThin } from "react-icons/pi";

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
      width={"100%"}
    >
      <CardBody display={"flex"} alignItems={"center"}>
        {post.heroImage?.url && (
          <Image
            width={"120px"}
            height={"100px"}
            aspectRatio={"auto"}
            mr={2}
            className={style.heroImage}
            src={post.heroImage?.url}
          />
        )}
        <Box width={"100%"} mt="6" display={"flex"} flexDirection={"column"}>
          <Heading size={"md"}>{post.title}</Heading>
          <Text color={"light.secondaryText"}>
            {post.subtitle || "subtitle from content"}
          </Text>
        </Box>
      </CardBody>

      <CardFooter w={"100%"}>
        <Flex alignItems={"center"}>
          <Avatar
            size={"sm"}
            name={post.author.name}
            src={post.author.profileImage.url}
          />
          <Flex flexDirection={"column"}>
            <Text>{post.author.name}</Text>
          </Flex>
        </Flex>

        <Box ml={"auto"} gap={4} justifyContent={"flex-end"}>
          <Button bg={"transparent"} p={3} fontSize={"20px"} color={"light.primaryText"}>
            <Text>0</Text>
            <i className="bx bxs-heart"></i>
          </Button>

          <Button bg={"transparent"} fontSize={"20px"} p={3} color={"light.primaryText"}>
            <Text>0</Text>
            <i className="bx bxs-bookmark"></i>
          </Button>

          <Button
            ml={"auto"}
            bg={"transparent"}
            fontSize={"20px"}
            p={3}
            color={"light.primaryText"}
          >
            <Text>0</Text>
            <i className="bx bxs-message-dots"></i>
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
}
