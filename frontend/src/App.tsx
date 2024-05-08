import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
