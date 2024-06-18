/** @format */

import style from "./style.module.css";

export default function Overview() {
  return (
    <div className={style.container}>
      <div className={style.welcome_section}>
        <h2>Welcome, [User's Name]!</h2>
        <p>Here’s a summary of your activity on the platform.</p>
      </div>

      <div className={style.activity_summary}>
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

      <ActivitySummary />

      <div className={style.shadow_bottom}></div>
    </div>
  );
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
}

interface Comment {
  id: number;
  excerpt: string;
  postTitle: string;
}

const ActivitySummary: React.FC = () => {
  const posts: Post[] = [
    { id: 1, title: "Post Title 1", excerpt: "This is an excerpt of post 1" },
    { id: 2, title: "Post Title 2", excerpt: "This is an excerpt of post 2" },
    // Add more posts as needed
  ];

  const comments: Comment[] = [
    { id: 1, excerpt: "This is an excerpt of comment 1", postTitle: "Post Title 1" },
    { id: 2, excerpt: "This is an excerpt of comment 2", postTitle: "Post Title 2" },
    // Add more comments as needed
  ];

  const editPost = (postId: number): void => {
    console.log("Editing post", postId);
  };

  const unpublishPost = (postId: number): void => {
    console.log("Unpublishing post", postId);
  };

  return (
    <div className={style.recent_activity}>
      <h3>Recent Posts</h3>
      <ul className={style.recent_posts}>
        {posts.map((post) => (
          <li key={post.id} className={style.recent_post_item}>
            <img src="https://picsum.photos/320/120" alt="" />
            <div className={style.recent_post_text_wrapper}>
              <h4 className={style.post_title}>{post.title}</h4>
              <p className={style.post_excerpt}>{post.excerpt}</p>
            </div>

            <div className={style.button_wrapper}>
              <button onClick={() => editPost(post.id)}>Edit</button>
              <button onClick={() => unpublishPost(post.id)}>Unpublish</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
