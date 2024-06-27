/** @format */
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { IPost } from "../../api/types";
import { serverAxios } from "../../api/axios";
import { Loading } from "../../components/loading";
import PostCard from "../../components/post";
import BrowseSideNav from "../../components/browseSideNav";
import { Box, Flex } from "@chakra-ui/react";

export default function Browse() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts()
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
      })
      .catch((error) => {
        setError(error.response.data);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  if (error) return <div style={{ paddingTop: "60px" }}>{error}</div>;

  return (
    <div className={style.container}>
      <BrowseSideNav />

      <div className={style.posts_container}>
        <Flex
          bg={"light.background"}
          width={"100%"}
          top={0}
          alignItems={"center"}
          zIndex={99}
          mt={10}
          p={1}
        >
          <button className={style.filter_btn}>Relevant</button>
          <button className={style.filter_btn}>Trending</button>
          <button className={style.filter_btn}>Following</button>
        </Flex>
        {posts.length > 0
          ? posts.map((post) => {
              return (
                <PostCard
                  statusText={false}
                  width="100%"
                  height="320px"
                  key={post._id}
                  showMenu={false}
                  post={post}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}

async function fetchPosts() {
  return new Promise<IPost[]>(async (resolve, reject) => {
    try {
      const response = await serverAxios.get("/article/");
      const data: IPost[] = response.data.posts;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
