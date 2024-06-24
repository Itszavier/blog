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
    <div className={`nav ${style.container}`}>
      <div className={style.logo_container}>
        <Link to="/" className={style.logo_link}>
          <h3>ProArticle</h3>
        </Link>
      </div>

      <ul className={style.navList}>
        {user ? (
          <>
            <li className={style.listItem}>
              <Link className={style.link} to={"/browse"}>
                browse
              </Link>
            </li>
            <li className={style.listItem}>
              <Link className={style.link} to={"/create"}>
                create
              </Link>
            </li>
            <li className={style.listItem}>
              <i className="bx bxs-bell"></i>
            </li>
            <li className={style.listItem}>
              <ProfileDropdown />
            </li>
          </>
        ) : (
          <>
            <li className={style.listItem}>
              <Link to={"#"} className={style.link}>
                <i className="bx bxl-instagram-alt"></i>
              </Link>
            </li>
            <li className={style.listItem}>
              <Link to="#" className={style.link}>
                <i className="bx bxl-twitter"></i>
              </Link>
            </li>
            <li className="divider-v"></li>
            <li className={style.listItem}>
              <Link className={style.link} to={"#"}>
                Membership
              </Link>
            </li>

            <li className={style.listItem}>
              <Link className={style.link} to={"#"}>
                contact
              </Link>
            </li>
            <li className={style.listItem}>
              <Link className={style.link} to={"/browse"}>
                Explore
              </Link>
            </li>
            <li className={style.listItem}>
              <button onClick={() => handleLoginPopup()} className={style.navBtn}>
                GET STARTED
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
