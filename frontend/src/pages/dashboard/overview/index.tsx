/** @format */

import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../../../api/types";
import { Loading } from "../../../components/loading";
import { useAuth } from "../../../context/auth";
import useFetch from "../../../hooks/useFetch";
import style from "./style.module.css";
import { IoHeart, IoHeartDislike } from "react-icons/io5";
import { MdComment } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
} from "@chakra-ui/react";

import PostTable from "./table";

export default function Overview() {
  const auth = useAuth();

  const { isPending, data } = useFetch<IPost[]>(`/article/user/${auth.user!._id}`, {
    key: "posts",
  });

  if (isPending) return <Loading />;

  return (
    <Box className={style.container} bg={"grey.100"} p={10}>
      <Box bg={"lavender"} className={`card ${style.welcome_section}`}>
        <Heading>Welcome, {auth.user?.name}!</Heading>
        <Text>Here’s a summary of your activity on the platform.</Text>
      </Box>

      <StatGroup gap={8}>
        <Stat rounded={10} boxShadow={"md"} className={style.summary_item}>
          <StatLabel>Total Drafts</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            <StatArrow type="decrease" />
          </StatHelpText>
        </Stat>
        <Stat rounded={10} boxShadow={"md"} className={style.summary_item}>
          <StatLabel>Published Posts</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            <StatArrow type="decrease" />
          </StatHelpText>
        </Stat>
        <Stat rounded={10} boxShadow={"md"} className={style.summary_item}>
          <StatLabel>Comments</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            <StatArrow type="decrease" />
          </StatHelpText>
        </Stat>
        <Stat rounded={10} boxShadow={"md"} className={style.summary_item}>
          <StatLabel>Total Likes</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            <StatArrow type="decrease" />
          </StatHelpText>
        </Stat>
      </StatGroup>
      <PostTable title="Drafts" posts={data!} />
    </Box>
  );
}
