import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";

import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />

          {/* SHOP + CATEGORY ROUTES */}
          <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
          <Route path="/shop/:category" element={<Shop onAddToCart={addToCart} />} />

          <Route path="/product/:id" element={<Product onAddToCart={addToCart} />} />

          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/account" element={<Account />} />
<Route path="/account" element={<Account />} />

          <Route path="/checkout" element={<Checkout cart={cart} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
