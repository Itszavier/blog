/** @format */

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import AuthModal from "./components/authmodal";
import Profile from "./pages/profile";
import { useModal } from "./context/modalContext";

function App() {
  const { authModal } = useModal();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile/" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>

      {authModal && <AuthModal />}
    </>
  );
}

export default App;
