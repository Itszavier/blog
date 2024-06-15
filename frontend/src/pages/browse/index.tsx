/** @format */
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { IPost } from "../../api/types";
import { serverAxios } from "../../api/axios";
import { Loading } from "../../components/loading";
import PostCard from "../../components/post";

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
      <div className={style.posts_container}>
        <div className={style.posts_container_header}>
          <button className={style.filter_btn}>For you</button>
          <button className={style.filter_btn}>Following</button>
          <button className={style.filter_btn}>Trending</button>
        </div>
        {posts.length > 0
          ? posts.map((post) => {
              return (
                <PostCard
                  statusText={false}
                  width="100%"
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
      const response = await serverAxios.get("/posts/");
      const data: IPost[] = response.data.posts;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
