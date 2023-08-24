import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const { productss, isLoading, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (errorMessage) {
      alert.error(errorMessage);
    }
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navbar />

      {isLoading && <Spinner />}
      {productss && (
        <Grid templateColumns={"250px 1fr"} py="6rem" gap="10">
          <GridItem bg="red">aasdfsfafaf</GridItem>
          <Grid templateColumns={"1fr 1fr 1fr"} gap={6} mx={2}>
            {productss.map((product) => (
              <GridItem key={product._id}>
                <Product product={product}></Product>
              </GridItem>
            ))}
          </Grid>
        </Grid>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default Products;
