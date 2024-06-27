/** @format */

import { useNavigate } from "react-router-dom";
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
import { map } from "lodash";
import { useState } from "react";

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

interface TableProps {
  title: string;
  posts: IPost[];
}

function PostTable(props: TableProps) {
  const navigate = useNavigate();
  const [posts, setPost] = useState<IPost[]>(() => props.posts || []);

  const editPost = (postId: string): void => {
    navigate(`/editor/${postId}`);
    console.log("Editing post", postId);
  };

  const unpublishPost = (postId: string): void => {
    console.log("Unpublishing post", postId);
  };

  return (
    <Box mt={"20px"} className={style.recent_activity}>
      <Box w={"450px"} display={"flex"} alignItems={"center"}>
        <Input flex={1} rounded={0} placeholder="Filter" />
        <Button rounded={0}>
          <SearchIcon />
        </Button>
      </Box>
      <TableContainer>
        <Table overflowY={"auto"} h={"120px"}>
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
            {props.posts.map((post) => {
              return (
                <Tr>
                  <Td isNumeric>
                    <Text isTruncated textAlign={"start"} width={"340px"}>
                      {post.title}
                    </Text>
                  </Td>
                  <Td isNumeric>{post.likes.length}</Td>
                  <Td isNumeric>0</Td>
                  <Td isNumeric>0</Td>
                  <Td>
                    <Button>Edit</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
