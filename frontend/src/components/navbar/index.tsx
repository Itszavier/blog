import style from "./styles.module.css";
import { Link } from "react-router-dom";
export default function Navbar() {
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

        <Link className={style.link} to="#">
          Login
        </Link>
        <Link className={style.link} to="#">
          Get Started
        </Link>
      </div>
    </div>
  );
}
