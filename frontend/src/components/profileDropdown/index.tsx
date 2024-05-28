/** @format */

import style from "./style.module.css";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileDropdown() {
  const [toggle, setToggle] = useState(false);
  const { user, setUser } = useAuth();

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
      const Navgate = useNavigate();

      const response = await axios.get("/login");

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
        <img className={style.user_profile} src={user.profileImage} alt="" />
      </div>

      {toggle && (
        <div id={"dropdown"} className={style.body}>
          <Link id={"dropdown"} onClick={hideMenu} to={`/profile/${user._id}`}>
            profile
          </Link>
          <Link id={"dropdown"} onClick={hideMenu} to="/settings">
            settings
          </Link>
          <button className={style.logout_btn}>logout</button>
        </div>
      )}
    </div>
  );
}
