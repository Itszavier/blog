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
  const [member, setMember] = useState<IMember | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.defualt_banner}></div>
          <div className={style.content_wrapper}>
            <img
              className={style.profile_img}
              src={
                member?.avatar || "https://avatar.iran.liara.run/public/boy?username=Ash"
              }
            />
            <div>
              <span className={style.name}>{member?.name || "Ash Lord"} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// rzhmxkdao7lltayfk
