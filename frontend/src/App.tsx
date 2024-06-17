/** @format */
import "./css/tiptap.css";

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ProtectedRoutes from "./components/protected";
import Settings from "./pages/dashboard";
import AuthModal from "./components/authmodal";
import EditorPage from "./pages/dashboard/editor";
import CreatePostModal from "./components/createPostModal";
import PostView from "./pages/post";
import Browse from "./pages/browse";
import Create from "./pages/create";

function App() {
  const location = useLocation();
  const path = location.pathname;
  // Define the paths where the Navbar should be hidden
  const pathsWithoutNavbar = ["/dashboard"];

  // Check if the current path matches any of the paths where Navbar should be hidden
  const hideNavbar = pathsWithoutNavbar.some((pattern) => path.startsWith(pattern));

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/create" element={<Create />} />
          <Route path="/article/:title/:handle" element={<PostView />} />
          <Route path="/browse" element={<Browse />} />
          <Route element={<Settings />} path="/dashboard/*" />
        </Route>
      </Routes>
      <CreatePostModal />
      <AuthModal />
    </>
  );
}

export default App;
