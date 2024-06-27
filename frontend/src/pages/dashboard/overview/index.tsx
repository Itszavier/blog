/** @format */

import { useNavigate } from "react-router-dom";
import { IPost } from "../../../api/types";
import { Loading } from "../../../components/loading";
import { useAuth } from "../../../context/auth";
import useFetch from "../../../hooks/useFetch";
import style from "./style.module.css";
import { IoHeart, IoHeartDislike } from "react-icons/io5";
import { MdComment } from "react-icons/md";
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
} from "@chakra-ui/react";

export default function Overview() {
  const auth = useAuth();

  const { isPending, data } = useFetch<IPost[]>(`/article/user/${auth.user!._id}`, {
    key: "posts",
  });

  const recentPosts = data?.map((post) => ({
    _id: post._id,
    title: post.title,
    excerpt: post.subtitle,
    handle: post.handle,
  }));

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
      <ActivitySummary title="Drafts" posts={recentPosts!} />
    </Box>
  );
}

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  handle: string;
}

interface ActivitySummaryProps {
  title: string;
  posts: Post[];
}

function ActivitySummary(props: ActivitySummaryProps) {
  const navigate = useNavigate();
  const editPost = (postId: string): void => {
    navigate(`/editor/${postId}`);
    console.log("Editing post", postId);
  };

  const unpublishPost = (postId: string): void => {
    console.log("Unpublishing post", postId);
  };

  return (
    <Box className={style.recent_activity}>
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th isNumeric>Impressions</Th>
              <Th isNumeric>Likes</Th>
              <Th isNumeric>Comments</Th>
              <Th>options</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Some Title 1</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>50</Td>
              <Td isNumeric>10</Td>
              <Td>
                <Button>Edit</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
