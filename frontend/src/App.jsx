import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";

import ProductDetail from "./pages/ProductDetail";
import SearchProducts from "./pages/SearchProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/searchproducts/:keyword" element={<SearchProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
