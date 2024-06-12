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
    <div className={style.container}>
      <div className={style.logo_wrapper}>
        <Link className={style.logo_link} to={user ? "/browse" : "/"}>
          <h2 className={style.logo}>Narrate</h2>
        </Link>
      </div>

      <div className={style.link_container}>
        {!user ? (
          <>
            <Link className={style.link} to="#">
              About
            </Link>

            <Link className={style.link} to="#">
              Membership
            </Link>

            <button
              className={` ${style.link} ${style.get_started_link} `}
              onClick={handleLoginPopup}
            >
              Get started
            </button>
          </>
        ) : (
          <>
            <Link to={"/Browse"} className={style.link}>
              Browse
            </Link>{" "}
            <button
              onClick={() => postModal.openModal()}
              className={`${style.link} ${style.nav_btn}`}
            >
              Write
            </button>
            <button
              className={`${style.link} ${style.nav_btn} ${style.nav_notification_btn}`}
            >
              <IoNotifications />
            </button>
            <ProfileDropdown />
          </>
        )}
      </div>
    </div>
  );
}
