/** @format */

import style from "./style.module.css";
import { useEffect, useState } from "react";
import { serverAxios } from "../../api/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { useAuth } from "../../context/auth";
import banner from "../../assets/landing.jpg";
import { IoSettings } from "react-icons/io5";
import { IPost } from "../../api/types";
import moment from "moment";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaComment, FaCommentAlt, FaHeart } from "react-icons/fa";
import PostMenuDropdown from "../../components/Postmenudropdown";
interface IMember {
  _id: string;
  name: string;
  username: string;
  profileImage: string;
  bio?: string;
  bannerUrl?: string;
}

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [member, setMember] = useState<IMember | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    serverAxios
      .get(`/user/${id}`, { signal: abortController.signal })
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

    serverAxios
      .get(`/posts/fetch/user`, {
        signal: abortController.signal,
      })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };

    return () => {
      abortController.abort();
    };
  }, []);

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
      <div className={style.profile_card}>
        <div className={style.profile_info_container}>
          <div className={`${style.data_wrapper} ${style.profile_info}`}>
            <img className={style.profileImage}src={member.profileImage} width={50} height={50} />
            <span>{member.name}</span>
          </div>
          <div className={style.data_wrapper}>
            <p>0</p>
            <span>posts</span>
          </div>
          <div className={style.data_wrapper}>
            <p>0</p>
            <span>followers</span>
          </div>
          <div className={style.data_wrapper}>
            <p>0</p>
            <span>following</span>
          </div>

          {/* <div className={style.data_wrapper}>
              <button>follow</button>
              <button>
                <IoSettings />
              </button>
            </div> */}
        </div>
        <div className={style.body}>
          <div>
            <p className={style.bio}>
              {member.bio} I am a programmer writer and ddddadasdasd
            </p>
          </div>
          <div className={style.button_container}>
            <button className={style.button}>Share</button>
            <button className={style.button}>Follow</button>
            {member._id == id && (
              <button className={style.button}>
                <IoSettings size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={style.posts}>
        {posts.map((post, index) => {
          return (
            <div key={index} className={style.post_card}>
              <div className={style.post_card_header}>
                <img src={post.author.profileImage} width={20} height={20} />

                <span>
                  <Link className={style.link} to={`/profile/${post.author._id}`}>
                    {post.author.name}
                  </Link>
                </span>
                <BsDot />

                {post.published ? (
                  <span className={style.status_text}>Published</span>
                ) : (
                  <span className={style.status_text}>Draft</span>
                )}

                <PostMenuDropdown post={post} />
              </div>
              <div className={style.post_card_body}>
                <div className={style.post_data_wrapper}>
                  <p className={style.title}>
                    <Link className={style.link} to={`/article/${post._id}`}>
                      {post.title}
                    </Link>
                  </p>
                  <p className={style.sub_title}>
                    {post.subtitle || "subtitle from content"}
                  </p>
                  <div className={style.profile_card_date}>
                    <span>{moment(post.createdAt).format("MMM DD YYYY")}</span>
                    {post.createdAt !== post.updatedAt && <BsDot />}
                    {post.createdAt !== post.updatedAt && (
                      <p>
                        <span>Updated</span> {moment(post.updatedAt).fromNow()}
                      </p>
                    )}
                  </div>
                </div>
                {post.heroImage?.url && (
                  <img
                    className={style.heroImage}
                    src={post.heroImage?.url}
                    alt=" "
                    width={120}
                    height={90}
                  />
                )}
              </div>
              <div className={style.footer}>
                <button className={style.card_footer_button}>
                  <FaHeart /> <span>0</span>
                </button>

                <button className={style.card_footer_button}>
                  <FaCommentAlt />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//
