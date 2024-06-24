/** @format */
import { useLocation, useParams } from "react-router-dom";
import style from "./style.module.css";
import { serverAxios } from "../../api/axios";
import { IPost } from "../../api/types";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { ButtonLoader, Loading } from "../../components/loading";
import { MdComment } from "react-icons/md";
import { IoBookmark, IoHeart, IoHeartDislike } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "@reactuses/core";
import { toast, ToastContainer } from "react-toastify";
import { likeArticle, unLikeArticle } from "../../api/functions";
import { ClipLoader } from "react-spinners";

export default function PostView() {
  const { title, handle } = useParams<{ title: string; handle: string }>();
  const location = useLocation();
  const state: { published: boolean; message: string } | undefined = location.state;
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [wasPublished, setWasPublished] = useState<boolean>(false);
  console.log(state, wasPublished);
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetchPost(title!, handle!)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [title, handle]);

  useEffect(() => {
    if (!state) {
      return;
    }
    toast.success("Your article was published", { theme: "dark", delay: 5000 });
    setWasPublished(true);
    const timeout = setTimeout(() => {
      setWasPublished(false);
    }, 5000); // Increased the timeout to 5000ms (5 seconds)
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!post) {
      return;
    }
    setIsLikeLoading(true);
    try {
      const data = await likeArticle(post?._id as string);
      console.log(data);
    } catch (error) {
      toast.error(
        `Error: Unable to Complete Action We encountered an issue while trying like this post`,
        { theme: "dark" }
      );
      console.log(error);
    } finally {
      setIsLikeLoading(false);
    }
  };
  const handleUnLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!post) {
      return;
    }
    setIsLikeLoading(true);
    try {
      const data = await unLikeArticle(post?._id as string);
      console.log(data);
    } catch (error) {
      toast.error(
        `Error: Unable to Complete Action We encountered an issue while trying like this post`,
        { theme: "dark" }
      );
      console.log(error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) return null;

  return (
    <div className={style.container}>
      <ToastContainer position="top-right" autoClose={5000} />
      {wasPublished && <Confetti width={width} height={height} />}
      {/*<Menu post={post} />*/}
      <div className={style.middle}>
        <div className={style.meta_header}>
          <div className={style.post_info_container}>
            <h2 className={style.title}>{post.title}</h2>
            <p className={style.subtitle}>{post.subtitle}</p>
          </div>
          <div className={style.info}>
            <div className={style.author_info_wrapper}>
              <div className={style.author_info}>
                <img width={30} height={30} src={post.author.profileImage.url} alt="" />
                <span>by {post.author.name}</span>
              </div>
              <span className={`text-s ${style.read_time_text}`}>10m read</span>
            </div>
            <div className={style.menu}>
              <div className={style.left}>
                <button
                  onClick={handleLike}
                  name={"like button"}
                  className={style.menu_btn}
                >
                  {true ? <ClipLoader color="white"  size={2} />: <span>0</span>}
                  <i className="bx bxs-heart"></i>
                </button>

                <button className={style.menu_btn}>
                  <span>0</span>
                  <i className="bx bxs-message-square-dots"></i>
                </button>
              </div>
              <div className={style.right}>
                <button className={style.menu_btn}>
                  <i className="bx bxs-bookmark"></i>
                </button>
              </div>
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
      const response = await serverAxios.get(
        `/article/fetch/publicView/${title}/${handle}`
      );
      const data: IPost = response.data.post;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
function likePost(arg0: string) {
  throw new Error("Function not implemented.");
}
