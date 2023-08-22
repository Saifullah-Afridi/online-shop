import { Box, Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { product } = useParams();
  console.log(product);
  return (
    <>
      <Navbar />

      <Grid
        // templateAreas={`"column1  coulmn2"`}
        templateColumns="1fr 1fr"
        gap="20px"
        pt="6rem"
        px="1rem"
      >
        <GridItem w="50%">a</GridItem>
        <GridItem w="50%">a</GridItem>
      </Grid>
      <Footer />
    </>
  );
};

export default ProductDetail;
