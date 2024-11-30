import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Allproduct from "./components/Allproduct";
import Login from "./components/auth/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Allproduct />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
