/** @format */

import { NavLink, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import google from "../../../assets/google.png";
import { create } from "lodash";
import { useAuth } from "../../../context/auth";
type NavigationLink = {
  path: string;
  label: string;
  icon?: string;
  className?: string; // Optional property
  subLinks?: NavigationLink[]; // Optional nested array
};

const navigationLinks = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "list",
  },
  {
    path: "/dashboard/privacy",
    label: "Privacy",
    icon: "security",
  },
  {
    label: "Account",
    icon: "account_circle", // Icon for Account category
    subLinks: [
      { path: "/dashboard/membership", label: "Membership" },
      { path: "/dashboard/billing", label: "Billing" },
      { path: "/dashboard/settings", label: "Settings" },
    ],
  },
];

export default function SideNav() {
  const Navigate = useNavigate();
  const auth = useAuth();
  return (
    <div className={`sidenav ${style.sidebar} `}>
      <header className={style.logo}>
        <span className={style.image}>
          <img src={auth.user?.profileImage.url} alt="" />
        </span>
        <div className={`${style.text} ${style.logo_text}`}>
          <span className={style.name}>{auth.user?.name}</span>
          <span className={style.profession}>Web developer</span>
        </div>
      </header>
      <div className={style.list_container}>
        <ul className={style.navlist}>
          <li className={style.navlist_item}>
            <NavLink to="/dashboard" className={style.navlink}>
              <i className="bx bxs-dashboard"></i>
              <span className="">Dashboard</span>
            </NavLink>
          </li>
          <li className={style.navlist_item}>
            <NavLink to="/dashboard/notifcations" className={style.navlink}>
              <i className="bx bxs-bell"></i>
              <span className="">Notifications</span>
            </NavLink>
          </li>
          <li className={style.navlist_item}>
            <NavLink to="#" className={style.navlink}>
              <i className="bx bxs-bar-chart-alt-2"></i>
              <span className="">Analytics</span>
            </NavLink>
          </li>
          <li className={style.navlist_item}>
            <NavLink to="/dashboard/settings" className={style.navlink}>
              <i className="bx bxs-cog"></i>
              <span className="">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={style.footer}>
        <button
          onClick={() => Navigate("/browse")}
          className={`button ${style.logoutBtn} ${style.exit_btn}`}
        >
          <i className="bx bxs-exit"></i>
          Exit Dashboard
        </button>
        <button className={` button ${style.logoutBtn} ${style.create_btn}`}>
          <i className="bx bxs-plus-circle"></i>
          Create
        </button>
        <button className={`button ${style.logoutBtn}`}>
          <i className={`bx bx-log-out  ${style.icon}`}></i>
          Logout
        </button>
      </div>
    </div>
  );
}
