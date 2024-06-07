/** @format */
import { Routes, Route, useLocation} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import AuthModal from "./components/authmodal";
import Profile from "./pages/profile";
import { useModal } from "./context/modalContext";
import ProtectedRoutes from "./components/protected";
import Settings from "./pages/settings";
import EditorPage from "./pages/editor";

function App() {
  const location = useLocation();
  const { authModal } = useModal();

  return (
    <>
     {location.pathname !== "/editor" ?  <Navbar /> : <></>} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Settings />} path="/settings/*" />
        </Route>
      </Routes>

      {authModal && <AuthModal />}
    </>
  );
}

export default App;
