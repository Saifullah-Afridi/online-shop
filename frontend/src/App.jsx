import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";

import ProductDetail from "./pages/ProductDetail";
import SearchProducts from "./pages/SearchProducts";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuListDetail from "./components/MenuListDetail";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/RegisterUser";
import { useEffect } from "react";
import store from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/UserSlice";
import { Flex, Menu, Text } from "@chakra-ui/react";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
function App() {
  const dispatch = useDispatch();
  const { userr, isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated, "****************************");
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Flex justifyContent="space-between" w="99%" alignItems="center">
          <Navbar />
          {isAuthenticated && <MenuListDetail user={userr} w="1%" />}
        </Flex>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/searchproducts/:keyword" element={<SearchProducts />} />
          <Route path="/menu" element={<MenuListDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Account />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
