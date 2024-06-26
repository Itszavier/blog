/** @format */

import { useNavigate } from "react-router-dom";
import { IPost } from "../../../api/types";
import { Loading } from "../../../components/loading";
import { useAuth } from "../../../context/auth";
import useFetch from "../../../hooks/useFetch";
import style from "./style.module.css";
import { IoHeart, IoHeartDislike } from "react-icons/io5";
import { MdComment } from "react-icons/md";

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
    <div className={style.container}>
      <div className={`card ${style.welcome_section}`}>
        <h2>Welcome, {auth.user?.name}!</h2>
        <p>Here’s a summary of your activity on the platform.</p>
      </div>

      <div className={`card ${style.activity_summary} `}>
        <div className={style.summary_item}>
          <h3>Published Posts</h3>
          <p>0</p>
        </div>
        <div className={style.summary_item}>
          <h3>Draft Posts</h3>
          <p>0</p>
        </div>
        <div className={style.summary_item}>
          <h3>Comments</h3>
          <p>0</p>
        </div>
        <div className={style.summary_item}>
          <h3>Likes Received</h3>
          <p>0</p>
        </div>
      </div>
      <ActivitySummary title="Drafts" posts={recentPosts!} />
    </div>
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
    <div className={style.recent_activity}>
      <h3>{props.title}</h3>
      <ul className={style.recent_posts}>
        {props.posts.map((post) => (
          <li
            onClick={(e) => {
              navigate(`/editor/${post._id}`);
            }}
            key={post._id}
            className={`card ${style.recent_post_item}`}
          >
            <img src="https://picsum.photos/320/120" alt="" />
            <div className={style.recent_post_text_wrapper}>
              <h4 className={style.post_title}>{post.title}</h4>

              <p className={style.post_excerpt}>{post.excerpt}</p>
            </div>

            <div className={style.recent_post_footer}>
              <p>
                <IoHeart /> <span>0</span>
              </p>
              <p>
                <IoHeartDislike /> <span>0</span>
              </p>
              <p>
                <MdComment />
                <span>0</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
