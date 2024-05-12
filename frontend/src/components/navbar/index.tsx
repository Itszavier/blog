import { useModal } from "../../context/modalContext";
import style from "./styles.module.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  
  const { setAuthModal } = useModal();

  const handleLoginPopup = () => {
    setAuthModal(true);
  };

  return (
    <div className={style.container}>
      <div className={style.logo_wrapper}>
        <h2 className={style.logo_text}>Narrate</h2>
      </div>

      <div className={style.link_container}>
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
      </div>
    </div>
  );
}
