import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";

import ProductDetail from "./pages/ProductDetail";
import SearchProducts from "./pages/SearchProducts";
import LoginRegistration from "./pages/LoginRegistration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import MenuListDetail from "./components/MenuListDetail";
import { useEffect } from "react";
import store from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import LoadUserr from "./components/loadUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginRegistration />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/searchproducts/:keyword" element={<SearchProducts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/menu" element={<MenuListDetail />} />
          <Route path="/clickme" element={<LoadUserr />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
