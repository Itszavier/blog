/** @format */

import style from "./style.module.css";
import { useEffect, useState } from "react";
import { serverAxios } from "../../api/axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/loading";
import { useAuth } from "../../context/auth";
import banner from "../../assets/landing.jpg";

interface IMember {
  _id: string;
  name: string;
  avatar: string;
  bio?: string;
  bannerUrl?: string;
}

export default function Profile() {
  const { id } = useParams();
  const auth = useAuth();
  const [member, setMember] = useState<IMember | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    serverAxios
      .get(`/user/${id}`)
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
        <div className={style.profile_card_header}>
          <img
            src={member.avatar}
            alt=""
            className={style.profile_img}
            width={90}
            height={90}
          />
          {banner ? (
            <img className={style.banner} src={banner} alt="" />
          ) : (
            <div className={style.default_banner}></div>
          )}
        </div>

        <div className={style.profile_card_body}>
          <p className={`${style.profile_user_text} ${style.profile_username} `}>
            {member.name}
          </p>
          <p className={`${style.profile_user_text} ${style.profile_user_bio} `}>
            {member.bio || "I am a avid writer"}
          </p>
          <div className={style.info_container}>
            <div className={style.profile_info_wrapper}>
              <span>
                <span className={style.highlighted_number}>200</span> Followers
              </span>
              <span>
                <span className={style.highlighted_number}>5</span> Posts
              </span>
            </div>
            <div className={style.profile_buttons}>
              <button className={style.follow_button}>follow</button>

              {auth.user && member._id === auth.user?._id ? (
                <button className={style.settings_button}>
                  <span className="material-icons">settings</span>
                </button>
              ) : (
                "hi"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//
