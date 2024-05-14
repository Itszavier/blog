/** @format */

import { useAuth } from "../../context/auth";
import { useModal } from "../../context/modalContext";
import ProfileDropdown from "../profileDropdown";
import style from "./styles.module.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { user } = useAuth();
  const { setAuthModal } = useModal();

  const handleLoginPopup = () => {
    setAuthModal(true);
  };

  return (
    <div className={style.container}>
      <div className={style.logo_wrapper}>
        <Link to={"/"} className={style.logo_link}>
          <h2>Narrate</h2>
        </Link>
      </div>

      <div className={style.link_container}>
        <Link className={style.link} to="#">
          About
        </Link>

        <Link className={style.link} to="#">
          Membership
        </Link>

        {!user ? (
          <button
            className={` ${style.link} ${style.get_started_link} `}
            onClick={handleLoginPopup}
          >
            Get started
          </button>
        ) : (
          <ProfileDropdown />
        )}
      </div>
    </div>
  );
}
