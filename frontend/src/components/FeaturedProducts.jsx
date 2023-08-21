import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Product from "./Product";

const FeaturedProducts = ({ product }) => {
  return (
    <Box paddingX={4}>
      <Heading as="h2" paddingY="60px" textAlign="center">
        Featured Products
      </Heading>
      <SimpleGrid minChildWidth="220px" spacingX="90px" spacingY={7}>
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </SimpleGrid>
    </Box>
  );
};

export default FeaturedProducts;
