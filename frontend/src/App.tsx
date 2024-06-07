/** @format */
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import { ModalProvider, useModal } from "./context/modalContext";
import ProtectedRoutes from "./components/protected";
import Settings from "./pages/settings";
import AuthModal from "./components/authmodal";
import EditorPage from "./pages/editor";

function App() {
  const location = useLocation();

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

      <ModalProvider>
        <ModalWrapper />
      </ModalProvider>
    </>
  );
}

const ModalWrapper = () => {
  const { openModal } = useModal("auth");

  openModal();
  return (
    <>
      <AuthModal />
    </>
  );
};
export default App;
