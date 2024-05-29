/** @format */
import { serverAxios } from "../../api/axios";
import { useAuth } from "../../context/auth";
import ProfileTab from "./profileTab";
import style from "./style.module.css";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";

export default function Settings() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await serverAxios.get("/auth/logout");
      navigate("/");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.nav_header}>
        <NavLink
          to="profile"
          className={({ isActive }) => {
            return `${style.nav_btn} ${isActive ? style.active_btn : ""}`;
          }}
        >
          <span className="material-icons">manage_accounts</span> Profile
        </NavLink>
        <NavLink
          to="privacy"
          className={({ isActive }) => {
            return `${style.nav_btn} ${isActive ? style.active_btn : ""}`;
          }}
        >
          <span className="material-icons">security</span> Privacy
        </NavLink>
        <NavLink
          to="membership"
          className={({ isActive }) => {
            return `${style.nav_btn} ${isActive ? style.active_btn : ""}`;
          }}
        >
          <span className="material-icons">card_membership</span> Membership
        </NavLink>

        <button onClick={handleLogout} className={style.logout_btn}>
          <span className="material-icons">logout</span> Logout
        </button>
      </div>
      <div className={style.body}>
        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          <Route path="profile" element={<ProfileTab />} />
          <Route path="privacy" element={<h3>Privacy settings, Is in develop m</h3>} />
          <Route
            path="membership"
            element={<h3>Membership Settings, Is in development</h3>}
          />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </div>
  );
}
