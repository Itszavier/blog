import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Navbar from "./components/navbar";
import Login from "./pages/login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
