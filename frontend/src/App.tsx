/** @format */

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ProtectedRoutes from "./components/protected";
import Settings from "./pages/dashboard";
import AuthModal from "./components/authmodal";
import EditorPage from "./pages/editor";
import PostView from "./pages/article";
import Browse from "./pages/browse";
import Create from "./pages/create";
import NotFound from "./pages/404";

import Publish from "./pages/publish";
import { useColorMode } from "@chakra-ui/react";
import Auth from "./pages/auth";

function App() {
  const location = useLocation();

  const path = location.pathname;
  // Define the paths where the Navbar should be hidden
  const pathsWithoutNavbar = ["/dashboard", "/editor"];

  // Check if the current path matches any of the paths where Navbar should be hidden
  const hideNavbar = pathsWithoutNavbar.some((pattern) => path.startsWith(pattern));

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/editor/:postId" element={<EditorPage />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/auth"} element={<Auth />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/create" element={<Create />} />
          <Route path="/publish/:postId" element={<Publish />} />
          <Route path="/article/:title/:handle" element={<PostView />} />
          <Route path="/browse" element={<Browse />} />
          <Route element={<Settings />} path="/dashboard/*" />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/*<CreateModal /> */}
    </>
  );
}

export default App;
