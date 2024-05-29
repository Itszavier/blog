/** @format */
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import AuthModal from "./components/authmodal";
import Profile from "./pages/profile";
import { useModal } from "./context/modalContext";
import ProtectedRoutes from "./components/protected";
import Settings from "./pages/settings";

function App() {
  const { authModal } = useModal();

  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Settings />} path="/settings/*" />
        </Route>
      </Routes>

      {authModal && <AuthModal />}
    </>
  );
}

export default App;
