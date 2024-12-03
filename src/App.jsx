import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Ganti Switch dengan Routes
import Allproduct from "./components/Allproduct";
import { CartProvider } from "../src/components/context/CardContext"; // Import CartProvider
import DetailProducts from "./components/DetailProducts";
import Cart from "./components/Cart";
import Checkout from "./components/Checkut";
import Login from "./components/auth/Login";
import Home from "./pages/Home";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Allproduct />} />
          {/* Menggunakan element sebagai pengganti component */}
          <Route path="/product/:id" element={<DetailProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
