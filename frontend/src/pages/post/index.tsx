/** @format */
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import { serverAxios } from "../../api/axios";
import { IPost } from "../../api/types";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Loading from "../../components/loading";
import moment from "moment";
import { BsDot } from "react-icons/bs";

export default function PostView() {
  const { id } = useParams();
  const auth = useAuth();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchPost(id as string)
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
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!post) return null;

  return (
    <div className={style.container}>
      <div className={style.middle}>
        <div className={style.meta_header}>
          <div className={style.publish_info}>
            <div className={style.author_container}>
              <img src={post.author.profileImage} alt="" width={35} height={35} />
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
            className={style.post_content}
            dangerouslySetInnerHTML={{ __html: post.content.html}}
          />
        </div>
      </div>
    </div>
  );
}

async function fetchPost(id: string) {
  return new Promise<IPost>(async (resolve, reject) => {
    try {
      const response = await serverAxios.get(`/posts/fetch/one/${id}`);
      const data: IPost = response.data.post;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
