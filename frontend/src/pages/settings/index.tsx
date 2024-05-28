/** @format */
import ProfileTab from "./profileTab";
import style from "./style.module.css";
import { Route, Routes } from "react-router-dom";

export default function Settings() {
  return (
    <div className={style.container}>
      <div className={style.nav_header}>
        <button name="profile" className={`${style.nav_btn} ${style.active_btn}`}>
          <span className={"material-icons"}>manage_accounts</span> Profile
        </button>
        <button name="#" className={style.nav_btn}>
          <span className={"material-icons"}>security</span> privicy
        </button>
        <button name="#" className={style.nav_btn}>
          <span className={"material-icons"}>card_membership</span> membership
        </button>
      </div>
      <div className={style.body}>
        <Routes>
          <Route path="/" element={<ProfileTab />} />
        </Routes>
      </div>
    </div>
  );
}
