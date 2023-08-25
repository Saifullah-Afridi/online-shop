import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";

import { Spinner } from "@chakra-ui/react";
// import { useAlert } from "react-alert";
import { useEffect } from "react";
const FeaturedProducts = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { productss, isLoading, errorMessage } = useSelector(
    (state) => state.product
  );
  let page = 1;
  let limit = 9;
  useEffect(() => {
    dispatch(getProducts(page, limit));
  }, [dispatch]);
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
    </Box>
  );
};

export default FeaturedProducts;
