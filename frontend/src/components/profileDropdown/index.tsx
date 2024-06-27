/** @format */

import style from "./style.module.css";
import { authContext, useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { serverAxios } from "../../api/axios";
import { IoNotifications } from "react-icons/io5";
import { Avatar, Box, useColorModeValue } from "@chakra-ui/react";

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
    <Box id={"profileDropdown"} className={` ${style.container}`}>
      <button
        id={"profileDropdown"}
        onClick={() => setToggle((prev) => !prev)}
        className={`border-none ${style.header}`}
      >
        <Avatar name={user.name} src={user.profileImage.url} />
      </button>

      {toggle && (
        <Box bg={'dark.cardBackground'}  id={"profileDropdown"} className={` ${style.body}`}>
          <div className={style.body_header}>
            <Link to={`/profile/${user.username}`}>
              <span>{user.name}</span>
            </Link>
          </div>
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
          <div className={style.footer}>
            <button
              onClick={handleLogout}
              className={`btn btn-secondary border  ${style.logout_btn}`}
            >
              logout
            </button>
          </div>
        </Box>
      )}
    </Box>
  );
}
