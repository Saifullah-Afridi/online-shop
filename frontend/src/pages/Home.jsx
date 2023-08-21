import React, { Fragment } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import shirt from "../assets/top1.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const product = {
    id: 1,
    name: "Blue Shirt",
    price: 300,
    image: shirt,
  };
  return (
    <Fragment>
      <Navbar s></Navbar>
      <HeroSection />
      <FeaturedProducts product={product} />
      <Footer />
    </Fragment>
  );
};

export default Home;
