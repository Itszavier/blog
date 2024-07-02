/** @format */

import style from "./style.module.css";
import { authContext, useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { serverAxios } from "../../api/axios";
import { IoNotifications } from "react-icons/io5";
import { Avatar, Box, Button } from "@chakra-ui/react";
import { useClickOutside } from "@reactuses/core";

export default function ProfileDropdown() {
  const [toggle, setToggle] = useState(false);
  const { user, setUser } = useAuth();
  const Navgate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hideMenu = () => setToggle(false);

  useClickOutside(dropdownRef, () => {
    setToggle(false);
  });

  if (!user) {
    return null;
  }
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
    <Box ref={dropdownRef}>
      <Button
        size={{ base: "md" }}
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
        p={0}
        w={"fit-content"}
        onClick={() => setToggle((prev) => !prev)}
      >
        <Avatar name={user.name} src={user.profileImage.url} />
      </Button>

      {toggle && (
        <Box
          bg={"light.cardBackground"}
          id={"profileDropdown"}
          className={` ${style.body}`}
        >
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
