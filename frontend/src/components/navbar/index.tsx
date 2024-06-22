/** @format */

import { IoNotifications } from "react-icons/io5";
import { useAuth } from "../../context/auth";
import { useModal } from "../../context/modalContext";
import ProfileDropdown from "../profileDropdown";
import style from "./styles.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useAuth();
  const postModal = useModal("createPost");
  const { openModal } = useModal("auth");

  const handleLoginPopup = () => {
    openModal();
  };

  return (
    <div className={`navbar ${style.container}`}>
      <div className={style.logo_container}>
        <Link to="/" className={style.logo_link}>
          <h3>ProArticle</h3>
        </Link>
      </div>

      <ul className={style.navList}>
        {user ? (
          <>
            <li className={style.listItem}>
              <Link to={"/browse"}>browse</Link>
            </li>
            <li className={style.listItem}>
              <Link to={"/create"}>create</Link>
            </li>
            <li className={style.listItem}>
              <ProfileDropdown />
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
