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
    if (toggle && !event.target.closest("#profileDropdown")) {
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
    <div id={"profileDropdown"} className={` ${style.container}`}>
      <button
        id={"profileDropdown"}
        onClick={() => setToggle((prev) => !prev)}
        className={style.header}
      >
        <span>{user.username}</span>
        <img className={style.user_profile} src={user.profileImage.url} alt="" />
      </button>

      {toggle && (
        <div id={"profileDropdown"} className={`card ${style.body}`}>
          <Link
            className={style.link}
            id={"dropdown"}
            onClick={hideMenu}
            to={`/profile/${user.username}`}
          >
            <i className="bx bxs-user-circle"></i>
            profile
          </Link>
          <Link className={style.link} id={"dropdown"} onClick={hideMenu} to="/dashboard">
            <i className="bx bxs-dashboard"></i>
            dashboard
          </Link>

          <Link
            className={style.link}
            id={"dropdown"}
            onClick={hideMenu}
            to="/dashboard/settings"
          >
            <i className="bx bxs-cog"></i>
            settings
          </Link>

          <Link
            className={style.link}
            id={"dropdown"}
            onClick={hideMenu}
            to="/dashboard/notification"
          >
            <i className="bx bxs-bell"></i>
            notification
          </Link>
          <button onClick={handleLogout} className={`button ${style.logout_btn}`}>
            logout
          </button>
        </div>
      )}
    </div>
  );
}
