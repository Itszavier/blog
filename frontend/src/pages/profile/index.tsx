/** @format */

import style from "./style.module.css";
import { useEffect, useState } from "react";
import { serverAxios } from "../../api/axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { useAuth } from "../../context/auth";
import { IMember, IPost } from "../../api/types";
import PostCard from "../../components/post";
import UserProfile from "../../components/userProfile";

export default function Profile() {
  const { username } = useParams();
  const auth = useAuth();
  const [member, setMember] = useState<IMember | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    serverAxios
      .get(`/user/fetch/username/${username}`, { signal: abortController.signal })
      .then(function (response) {
        console.log(response.data.user);
        setMember(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [username]);

  useEffect(() => {
    if (!loading && member) {
      serverAxios
        .get(`/posts/fetch/user/${member?._id}`)
        .then((response) => {
          console.log(response.data);
          console.log("posts", posts);
          setPosts(response.data.posts);
          console.log("posts", posts);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading, member, username]);

  if (loading || auth.loading) {
    return <Loading />;
  }

  if (!member) {
    return <div style={{ paddingTop: "60px" }}> member not found</div>;
  }

  // handle when the user is not found here
  console.log(auth.user);

  return (
    <div className={style.container}>
      <UserProfile userId={member._id as string} member={member} setMember={setMember} />

      <div className={style.posts}>
        {posts.map((post, index) => {
          return <PostCard key={index} post={post} statusText={true} />;
        })}
      </div>
    </div>
  );
}
