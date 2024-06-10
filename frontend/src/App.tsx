/** @format */
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ProtectedRoutes from "./components/protected";
import Settings from "./pages/settings";
import AuthModal from "./components/authmodal";
import EditorPage from "./pages/editor";
import CreatePostModal from "./components/createPostModal";
import localtunnel from "localtunnel";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const path = location.pathname;
  // Define the paths where the Navbar should be hidden
  const pathsWithoutNavbar = ["/editor"];

  // Check if the current path matches any of the paths where Navbar should be hidden
  const hideNavbar = pathsWithoutNavbar.some((pattern) => path.startsWith(pattern));

  return (
    <>
      {hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/editor/:id" element={<EditorPage />} />
          <Route element={<Settings />} path="/settings/*" />
        </Route>
      </Routes>
      <CreatePostModal />
      <AuthModal />
    </>
  );
}

export default App;
