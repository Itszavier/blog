/** @format */
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { serverAxios } from "../../api/axios";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading";
import { useAuth } from "../../context/auth";
import { IMember, IPost } from "../../api/types";
import PostCard from "../../components/post";
import UserProfile from "../../components/userProfile";
import { Box, Divider } from "@chakra-ui/react";
import UserCreations from "./userCreations";

export default function Profile() {
  const { username } = useParams();
  const auth = useAuth();
  const [member, setMember] = useState<IMember | null>(null);
  const [memberLoading, setMemberLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    setMemberLoading(true);
    const abortController = new AbortController();
    serverAxios
      .get(`/user/username/${username}`, { signal: abortController.signal })
      .then(function (response) {
        setMember(response.data.user);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setMemberLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [username]);

  if (auth.loading || memberLoading) {
    return <Loading />;
  }

  if (!member) {
    return <div style={{ paddingTop: "60px" }}>Member not found</div>;
  }

  return (
    <Box
      display={"flex"}
      w={"100%"}
      justifyContent={"center"}
      className={style.container}
    >
      <Box w={{ base: "90%", md: "60%", lg: "55%" }} p={{ sm: 0, md: 0 }}>
        <UserProfile
          userId={member._id as string}
          member={member}
          setMember={setMember}
        />

        <UserCreations memberId={member._id} />
      </Box>
    </Box>
  );
}

/**
 *   <div className={style.posts}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostCard key={index} post={post} statusText={true} showMenu />
          ))
        ) : (
          <div className={style.no_articles_container}>
            <div className={style.no_articles_message}>
              <p>You currently don't have any articles.</p>
              <p>
                Start sharing your thoughts and ideas by creating your first article now!
              </p>
              <button className={style.create_article_button}>Create Article</button>
            </div>
          </div>
        )}
      </div>
 */
