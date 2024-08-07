/** @format */

import { Box, Flex, Text, Image, Skeleton } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { IPost } from "../../api/types";
import { Link } from "react-router-dom";

interface Props {
  memberId: string;
}

export default function UserCreations(props: Props) {
  const postFetchData = useFetch<IPost[]>(`/article/user/${props.memberId}`, {
    key: "posts",
    initialData: [],
  });

  console.log(postFetchData.data);

  return (
    <Box boxShadow={"md"} mt={15}>
      <Tabs  variant="enclosed" colorScheme="black">
        <TabList>
          <Tab>Articles</Tab>
          <Tab isDisabled>Collections</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Skeleton isLoaded={!postFetchData.isPending}>
              <Box pt={4} display={"flex"} flexDirection={"column"} gap={5}>
                {postFetchData.data!.length > 0 ? (
                  postFetchData.data!.map((post) => <ArticleItem post={post} />)
                ) : (
                  <EmptyMessage message="You currently don't have any posts at the moment" />
                )}
              </Box>
            </Skeleton>
          </TabPanel>

          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function ArticleItem({ post }: { post: IPost }) {
  const url = `/article/${encodeURIComponent(post.title)}/${post.handle}`;
  return (
    <Flex alignItems={"center"}>
      <Image mr={2} rounded={10} w={100} h={90} src="https://i.pravatar.cc/" />
      <Flex gap={1} flexDirection={"column"}>
        <Text m={0} fontSize={18} fontWeight={"bold"}>
          <Link to={url}> {post.title}</Link>
        </Text>
        <Text m={0}>{post.subtitle || "this is the subtitle"}</Text>
      </Flex>
    </Flex>
  );
}

function EmptyMessage({ message }: { message: string }) {
  return (
    <Box display={"flex"} p={4} justifyContent={"center"}>
      {message}
    </Box>
  );
}
