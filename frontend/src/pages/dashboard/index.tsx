/** @format */
import { serverAxios } from "../../api/axios";
import Editor from "./editor";
import { useAuth } from "../../context/auth";
import ProfileTab from "./profileTab";
import style from "./style.module.css";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SideNav from "./sideNav";
import Overview from "./overview";

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
      <SideNav />
      <div className={style.body}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="profile" element={<ProfileTab />} />
          <Route path="privacy" element={<h3>Privacy settings, Is in develop m</h3>} />
          <Route path="/editor/:postId" element={<Editor />} />
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
