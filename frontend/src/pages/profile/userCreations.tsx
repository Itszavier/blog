/** @format */

import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { IPost } from "../../api/types";

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
    <Box boxShadow={"md"} mt={8}>
      <Tabs mt={8} variant="enclosed" colorScheme="black">
        <TabList>
          <Tab>Articles</Tab>
          <Tab isDisabled>Collections</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box pt={4} display={"flex"} flexDirection={"column"} gap={5}>
              {postFetchData.data!.map((post) => (
                <ArticleItem post={post} />
              ))}
            </Box>
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
  return (
    <Flex alignItems={"center"}>
      <Image mr={2} rounded={10} w={100} h={90} src="https://i.pravatar.cc/" />
      <Flex gap={1} flexDirection={"column"}>
        <Text m={0} fontSize={18} fontWeight={"bold"}>
          {post.title}
        </Text>
        <Text m={0}>{post.subtitle || "this is the subtitle"}</Text>
      </Flex>
    </Flex>
  );
}
