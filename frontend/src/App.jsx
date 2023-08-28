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
import MenuListDetail from "./components/MenuListDetail";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";

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
          <Route path="/menu" element={<MenuListDetail />} />
          <Route path="/profile" element={<Account />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
