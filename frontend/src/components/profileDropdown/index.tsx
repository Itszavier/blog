/** @format */

import style from "./style.module.css";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { serverAxios } from "../../api/axios";
import { IoNotifications } from "react-icons/io5";

export default function ProfileDropdown() {
  const [toggle, setToggle] = useState(false);
  const { user, setUser } = useAuth();
  const Navgate = useNavigate();

  const handleClickOutside = (event: any) => {
    if (toggle && !event.target.closest("#dropdown")) {
      setToggle(false);
    }
  };

  useEffect(() => {
    // Add event listener on document mount
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove listener on unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, [toggle]); // Re-run effect only when toggle changes

  if (!user) {
    return "";
  }

  const hideMenu = () => setToggle(false);

  const handleLogout = async () => {
    try {
      setToggle(false);
      await serverAxios.get("/auth/logout");
      setUser(null);
      Navgate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id={"dropdown"} className={style.container}>
      <div
        id={"dropdown"}
        onClick={() => setToggle((prev) => !prev)}
        className={style.header}
      >
        <span>{user.username}</span>
        <img className={style.user_profile} src={user.profileImage} alt="" />
      </div>

      {toggle && (
        <div id={"dropdown"} className={style.body}>
          <Link id={"dropdown"} onClick={hideMenu} to={`/profile/${user.username}`}>
            profile
          </Link>
          <Link id={"dropdown"} onClick={hideMenu} to="/settings">
            settings
          </Link>
          <button onClick={handleLogout} className={style.logout_btn}>
            logout
          </button>
        </div>
      )}
    </div>
  );
}
