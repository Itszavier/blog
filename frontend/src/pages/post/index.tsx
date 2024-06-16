/** @format */
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import { serverAxios } from "../../api/axios";
import { IPost } from "../../api/types";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Loading } from "../../components/loading";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { MdComment, MdModeComment } from "react-icons/md";
import { IoBookmark, IoHeart, IoHeartDislike } from "react-icons/io5";
import { FaBookBookmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

export default function PostView() {
  const { title, handle } = useParams();
  console.log("Title:", title);
  const auth = useAuth();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchPost(title!, handle!)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [title, handle]);

  if (loading) {
    return <Loading />;
  }

  if (!post) return null;

  return (
    <div className={style.container}>
      <Menu post={post} />
      <div className={style.middle}>
        <div className={style.meta_header}>
          <div className={style.publish_info}>
            <div className={style.author_container}>
              <img src={post.author.profileImage.url} alt="" width={35} height={35} />
              <span>{post.author.name}</span>
            </div>

            <div className={style.dates}>
              <span>
                <strong>0</strong> views
              </span>
              <BsDot className={style.seprator} />
              <span>{moment(post.createdAt).format("MMM DD YYYY")}</span>
            </div>
          </div>
          {post.heroImage && (
            <div className={style.heroImage_container}>
              <img
                className={style.heroImage}
                src={post.heroImage?.url}
                alt=""
                width={"100%"}
                height={300}
              />
            </div>
          )}
          <div className={style.post_info_container}>
            <h2 className={style.title}>{post.title}</h2>
            <p className={style.subtitle}>{post.subtitle}</p>
          </div>
        </div>
        <div className={style.body}>
          <div
            className={`${style.post_content} content_preview`}
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </div>
      </div>
    </div>
  );
}

function Menu({ post }: { post: IPost }) {
  const auth = useAuth();
  return (
    <div className={style.menu}>
      <button className={style.menu_btn}>
        <IoHeart /> <span>0</span>
      </button>

      <button className={style.menu_btn}>
        <IoHeartDislike /> <span>0</span>
      </button>

      <button className={style.menu_btn}>
        <MdComment />
      </button>

      <button className={style.menu_btn}>
        <IoBookmark />
      </button>

      {auth.user?._id == post.author._id && (
        <button className={`${style.menu_btn} ${style.menu_edit}`}>
          <FaEdit />
        </button>
      )}
    </div>
  );
}

async function fetchPost(title: string, handle: string) {
  return new Promise<IPost>(async (resolve, reject) => {
    try {
      const response = await serverAxios.get(`/posts/fetch/publicView/${title}/${handle}`);
      const data: IPost = response.data.post;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
