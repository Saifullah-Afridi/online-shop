import { Box, Center, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Product from "./Product";
import axios, { CanceledError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useAlert } from "react-alert";
const FeaturedProducts = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { productss, isLoading, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (errorMessage) {
      alert.error(errorMessage);
    }
    dispatch(getProducts());
    // const controller = new AbortController();
    // axios
    //   .get("http://localhost:3001/api/v1/products", {
    //     signal: controller.signal,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setData(res.data.products);
    //   })
    //   .catch((err) => {
    //     if (err instanceof CanceledError) return;
    //     setError(err.message);
    //   });
    // return () => controller.abort();
  }, [dispatch, errorMessage, alert]);
  return (
    <Box paddingX={4}>
      <Heading as="h2" paddingY="60px" textAlign="center">
        Featured Products
      </Heading>
      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}
      <SimpleGrid minChildWidth="220px" spacingX="90px" spacingY={7}>
        {productss &&
          productss.map((product) => (
            <Product key={product.id} product={product}></Product>
          ))}
      </SimpleGrid>
      {/* <ul>
        {productss.map((dat) => (
          <li key={dat._id}>{dat.name}</li>
        ))}
      </ul> */}
    </Box>
  );
};

export default FeaturedProducts;
