/** @format */

import style from "./style.module.css";
import { useEffect, useState } from "react";
//import { serverAxios } from "../../api/axios";
import { useParams } from "react-router-dom";

interface IMember {
  _id: string;
  name: string;
  avatar: string;
}

export default function Profile() {
  //const { id } = useParams();
  //  const [member, setMember] = useState<IMember | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  /*
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
*/
  // handle when the user is not found here

  return (
    <div className={style.container}>
      <div className={style.profile_card}>
        <div className={style.profile_card_header}>
          <img
            src="https://avatar.iran.liara.run/public/boy?username=Ash"
            alt=""
            className={style.profile_img}
            width={90}
            height={90}
          />
          <div className={style.default_banner}></div>
        </div>

        <div className={style.profile_card_body}>
          <p
            className={`${style.profile_user_text} ${style.profile_username} `}
          >
            Ash Lad
          </p>
          <p
            className={`${style.profile_user_text} ${style.profile_user_bio} `}
          >
            Hi, I am Lad a Writer and avid reader
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
              <button className={style.settings_button}>
                <span className="material-icons">settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// rzhmxkdao7lltayfk
