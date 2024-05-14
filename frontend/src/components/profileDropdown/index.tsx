/** @format */

import style from "./style.module.css";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProfileDropdown() {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuth();

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

  return (
    <div id={"dropdown"} className={style.container}>
      <div
        id={"dropdown"}
        onClick={() => setToggle((prev) => !prev)}
        className={style.header}
      >
        <img className={style.user_profile} src={user.avatar} alt="" />
      </div>

      {toggle && (
        <div id={"dropdown"} className={style.body}>
          <Link id={"dropdown"} onClick={hideMenu} to={`/profile/${user._id}`}>
            profile
          </Link>
          <Link id={"dropdown"} onClick={hideMenu} to="/settings">
            settings
          </Link>
        </div>
      )}
    </div>
  );
}
